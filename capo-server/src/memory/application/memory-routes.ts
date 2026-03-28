import type { FastifyInstance } from 'fastify';
import { memoryRepository } from '../infrastructure/memory-repository.js';
import { success, error } from '../../plugins/envelope.js';

export async function memoryRoutes(app: FastifyInstance) {
  // List memory entries for an agent
  app.get('/api/v1/workspaces/:workspaceId/agents/:agentId/memory', async (req, reply) => {
    const { agentId } = req.params as { workspaceId: string; agentId: string };
    const { layer, limit } = req.query as { layer?: string; limit?: string };
    const entries = await memoryRepository.findByAgent(agentId, {
      layer,
      limit: limit ? Number(limit) : undefined,
    });
    return success(reply, entries);
  });

  // Get single memory entry
  app.get('/api/v1/workspaces/:workspaceId/agents/:agentId/memory/:entryId', async (req, reply) => {
    const { entryId } = req.params as { workspaceId: string; agentId: string; entryId: string };
    const entry = await memoryRepository.findById(entryId);
    if (!entry) return error(reply, 'Memory entry not found', 404);
    await memoryRepository.touchAccessed(entryId);
    return success(reply, entry);
  });

  // Create memory entry
  app.post('/api/v1/workspaces/:workspaceId/agents/:agentId/memory', async (req, reply) => {
    const { agentId } = req.params as { workspaceId: string; agentId: string };
    const body = req.body as {
      layer: string;
      content: string;
      metadata?: Record<string, unknown>;
      accessControl?: Record<string, unknown>;
      expiresAt?: string;
    };

    const entry = await memoryRepository.create({
      agentId,
      layer: body.layer,
      content: body.content,
      metadata: body.metadata,
      accessControl: body.accessControl,
      expiresAt: body.expiresAt,
    });

    return success(reply, entry, undefined, 201);
  });

  // Delete single memory entry
  app.delete('/api/v1/workspaces/:workspaceId/agents/:agentId/memory/:entryId', async (req, reply) => {
    const { entryId } = req.params as { workspaceId: string; agentId: string; entryId: string };
    const deleted = await memoryRepository.delete(entryId);
    if (!deleted) return error(reply, 'Memory entry not found', 404);
    return success(reply, { id: entryId, deleted: true });
  });

  // Clear all memory for an agent (optionally by layer)
  app.delete('/api/v1/workspaces/:workspaceId/agents/:agentId/memory', async (req, reply) => {
    const { agentId } = req.params as { workspaceId: string; agentId: string };
    const { layer } = req.query as { layer?: string };
    const count = await memoryRepository.deleteByAgent(agentId, layer);
    return success(reply, { agentId, deletedCount: count });
  });
}
