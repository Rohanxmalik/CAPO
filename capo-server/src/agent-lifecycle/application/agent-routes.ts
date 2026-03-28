import type { FastifyInstance } from 'fastify';
import { agentRepository } from '../infrastructure/agent-repository.js';
import { auditRepository } from '../../governance/infrastructure/audit-repository.js';
import { success, error } from '../../plugins/envelope.js';
import { eventBus } from '../../shared/event-bus.js';
import { createAgentSchema, updateAgentSchema } from '../../shared/schemas.js';

export async function agentRoutes(app: FastifyInstance) {
  // List agents in workspace
  app.get('/api/v1/workspaces/:workspaceId/agents', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const agents = await agentRepository.findByWorkspace(workspaceId);
    return success(reply, agents);
  });

  // Get single agent
  app.get('/api/v1/workspaces/:workspaceId/agents/:agentId', async (req, reply) => {
    const { workspaceId, agentId } = req.params as { workspaceId: string; agentId: string };
    const agent = await agentRepository.findById(workspaceId, agentId);
    if (!agent) return error(reply, 'Agent not found', 404);
    return success(reply, agent);
  });

  // Create agent
  app.post('/api/v1/workspaces/:workspaceId/agents', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const parsed = createAgentSchema.safeParse(req.body);
    if (!parsed.success) {
      return error(reply, parsed.error.issues.map((i) => i.message).join('; '), 400);
    }
    const body = parsed.data as Record<string, unknown>;
    const agent = await agentRepository.create({
      ...body,
      workspaceId,
    } as Parameters<typeof agentRepository.create>[0]) as Record<string, unknown>;

    await eventBus.publish(`workspace:${workspaceId}:events`, {
      type: 'agent.status',
      payload: { agentId: agent.id, status: 'idle' },
      timestamp: new Date().toISOString(),
    });

    await auditRepository.create({
      workspaceId,
      agentId: agent.id as string,
      agentName: (body.displayName ?? body.name) as string,
      action: 'agent.created',
      details: `Created agent "${body.name}" with role ${body.role}`,
    });

    return success(reply, agent, undefined, 201);
  });

  // Update agent
  app.patch('/api/v1/workspaces/:workspaceId/agents/:agentId', async (req, reply) => {
    const { workspaceId, agentId } = req.params as { workspaceId: string; agentId: string };
    const parsed = updateAgentSchema.safeParse(req.body);
    if (!parsed.success) {
      return error(reply, parsed.error.issues.map((i) => i.message).join('; '), 400);
    }
    const body = parsed.data as Record<string, unknown>;
    const agent = await agentRepository.update(workspaceId, agentId, body);
    if (!agent) return error(reply, 'Agent not found', 404);

    if (body.status) {
      await eventBus.publish(`workspace:${workspaceId}:events`, {
        type: 'agent.status',
        payload: { agentId, status: body.status },
        timestamp: new Date().toISOString(),
      });
    }

    await auditRepository.create({
      workspaceId,
      agentId,
      action: 'agent.updated',
      details: `Updated fields: ${Object.keys(body).join(', ')}`,
    });

    return success(reply, agent);
  });

  // Delete agent
  app.delete('/api/v1/workspaces/:workspaceId/agents/:agentId', async (req, reply) => {
    const { workspaceId, agentId } = req.params as { workspaceId: string; agentId: string };
    const deleted = await agentRepository.delete(workspaceId, agentId);
    if (!deleted) return error(reply, 'Agent not found', 404);

    await auditRepository.create({
      workspaceId,
      agentId,
      action: 'agent.deleted',
    });

    return success(reply, { id: agentId, deleted: true });
  });
}
