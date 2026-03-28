import type { FastifyInstance } from 'fastify';
import { taskRepository } from '../infrastructure/task-repository.js';
import { auditRepository } from '../../governance/infrastructure/audit-repository.js';
import { success, error } from '../../plugins/envelope.js';
import { eventBus } from '../../shared/event-bus.js';
import { createTaskSchema, claimTaskSchema } from '../../shared/schemas.js';

export async function taskRoutes(app: FastifyInstance) {
  // List tasks
  app.get('/api/v1/workspaces/:workspaceId/tasks', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const { status, assignedTo } = req.query as { status?: string; assignedTo?: string };
    const tasks = await taskRepository.findByWorkspace(workspaceId, { status, assignedTo });
    return success(reply, tasks);
  });

  // Get task
  app.get('/api/v1/workspaces/:workspaceId/tasks/:taskId', async (req, reply) => {
    const { workspaceId, taskId } = req.params as { workspaceId: string; taskId: string };
    const task = await taskRepository.findById(workspaceId, taskId);
    if (!task) return error(reply, 'Task not found', 404);
    return success(reply, task);
  });

  // Create task
  app.post('/api/v1/workspaces/:workspaceId/tasks', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return error(reply, parsed.error.issues.map((i) => i.message).join('; '), 400);
    }
    const body = parsed.data as Record<string, unknown>;
    const task = await taskRepository.create({
      ...body,
      workspaceId,
    } as Parameters<typeof taskRepository.create>[0]);

    await eventBus.publish(`workspace:${workspaceId}:events`, {
      type: 'task.update',
      payload: { taskId: (task as Record<string, unknown>).id, status: 'pending' },
      timestamp: new Date().toISOString(),
    });

    await auditRepository.create({
      workspaceId,
      taskId: (task as Record<string, unknown>).id as string,
      agentId: body.createdBy as string | undefined,
      action: 'task.created',
      details: `Task "${body.title}" created with priority ${body.priority ?? 'medium'}`,
    });

    return success(reply, task, undefined, 201);
  });

  // Update task
  app.patch('/api/v1/workspaces/:workspaceId/tasks/:taskId', async (req, reply) => {
    const { workspaceId, taskId } = req.params as { workspaceId: string; taskId: string };
    const body = req.body as Record<string, unknown>;
    const task = await taskRepository.update(workspaceId, taskId, body);
    if (!task) return error(reply, 'Task not found', 404);

    await eventBus.publish(`workspace:${workspaceId}:events`, {
      type: body.status === 'completed' ? 'task.completed' : 'task.update',
      payload: { taskId, status: body.status ?? (task as Record<string, unknown>).status },
      timestamp: new Date().toISOString(),
    });

    await auditRepository.create({
      workspaceId,
      taskId,
      action: body.status === 'completed' ? 'task.completed' : 'task.updated',
      details: `Task updated: ${Object.keys(body).join(', ')}`,
    });

    return success(reply, task);
  });

  // Atomic claim next task
  app.post('/api/v1/workspaces/:workspaceId/tasks/claim', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const parsed = claimTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return error(reply, parsed.error.issues.map((i) => i.message).join('; '), 400);
    }
    const { agentId, taskType } = parsed.data;
    const task = await taskRepository.claimNext(workspaceId, agentId, taskType);
    if (!task) return success(reply, null);

    await eventBus.publish(`workspace:${workspaceId}:events`, {
      type: 'task.update',
      payload: { taskId: (task as Record<string, unknown>).id, status: 'in_progress', agentId },
      timestamp: new Date().toISOString(),
    });

    await auditRepository.create({
      workspaceId,
      taskId: (task as Record<string, unknown>).id as string,
      agentId,
      action: 'task.claimed',
      details: 'Task claimed via atomic checkout',
    });

    return success(reply, task);
  });
}
