import type { FastifyInstance } from 'fastify';
import { auditRepository } from '../infrastructure/audit-repository.js';
import { success } from '../../plugins/envelope.js';

export async function auditRoutes(app: FastifyInstance) {
  // Query audit log
  app.get('/api/v1/workspaces/:workspaceId/audit', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const { limit, offset, agentId } = req.query as {
      limit?: string;
      offset?: string;
      agentId?: string;
    };

    const { entries, total, page, limit: pageLimit } = await auditRepository.findByWorkspace(
      workspaceId,
      {
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        agentId,
      }
    );

    return success(reply, entries, {
      total,
      page,
      limit: pageLimit,
      hasMore: page * pageLimit < total,
    });
  });
}
