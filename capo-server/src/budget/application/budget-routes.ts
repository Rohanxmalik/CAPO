import type { FastifyInstance } from 'fastify';
import { budgetRepository } from '../infrastructure/budget-repository.js';
import { success } from '../../plugins/envelope.js';

export async function budgetRoutes(app: FastifyInstance) {
  // Get workspace budget summary
  app.get('/api/v1/workspaces/:workspaceId/budget', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const summary = await budgetRepository.getSummary(workspaceId);
    return success(reply, summary);
  });
}
