import type { FastifyInstance } from 'fastify';
import { workspaceRepository } from '../infrastructure/workspace-repository.js';
import { success, error } from '../../plugins/envelope.js';

export async function workspaceRoutes(app: FastifyInstance) {
  // List workspaces
  app.get('/api/v1/workspaces', async (_req, reply) => {
    const workspaces = await workspaceRepository.findAll();
    return success(reply, workspaces);
  });

  // Get workspace
  app.get('/api/v1/workspaces/:workspaceId', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const workspace = await workspaceRepository.findById(workspaceId);
    if (!workspace) return error(reply, 'Workspace not found', 404);
    return success(reply, workspace);
  });

  // Create workspace
  app.post('/api/v1/workspaces', async (req, reply) => {
    const body = req.body as Record<string, unknown>;
    const workspace = await workspaceRepository.create(body as Parameters<typeof workspaceRepository.create>[0]);
    return success(reply, workspace, undefined, 201);
  });

  // Delete workspace
  app.delete('/api/v1/workspaces/:workspaceId', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const deleted = await workspaceRepository.delete(workspaceId);
    if (!deleted) return error(reply, 'Workspace not found', 404);
    return success(reply, { id: workspaceId, deleted: true });
  });
}
