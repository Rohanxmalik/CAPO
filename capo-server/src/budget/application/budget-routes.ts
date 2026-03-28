import type { FastifyInstance } from 'fastify';
import { budgetRepository } from '../infrastructure/budget-repository.js';
import { success, error } from '../../plugins/envelope.js';
import { eventBus } from '../../shared/event-bus.js';
import { recordBudgetSchema } from '../../shared/schemas.js';

export async function budgetRoutes(app: FastifyInstance) {
  // Get workspace budget summary
  app.get('/api/v1/workspaces/:workspaceId/budget', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const summary = await budgetRepository.getSummary(workspaceId);
    return success(reply, summary);
  });

  // Record budget usage and check thresholds
  app.post('/api/v1/workspaces/:workspaceId/budget', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const parsed = recordBudgetSchema.safeParse(req.body);
    if (!parsed.success) {
      return error(reply, parsed.error.issues.map((i) => i.message).join('; '), 400);
    }
    const body = parsed.data;

    // Check agent budget before recording
    const summary = await budgetRepository.getSummary(workspaceId);
    const agentEntry = summary.byAgent.find(
      (a: { agentId: unknown }) => String(a.agentId) === body.agentId
    );
    const agentSpent = (agentEntry?.costUsd ?? 0) + body.costUsd;
    const workspaceSpent = summary.totalSpent + body.costUsd;
    const workspacePct = summary.totalBudget > 0
      ? Math.round((workspaceSpent / summary.totalBudget) * 100)
      : 0;

    // Determine alert level
    let alertTriggered: string | undefined;
    if (workspacePct >= 100) alertTriggered = 'hard_stop';
    else if (workspacePct >= 95) alertTriggered = 'soft_stop';
    else if (workspacePct >= 90) alertTriggered = 'throttle';
    else if (workspacePct >= 75) alertTriggered = 'warning';
    else if (workspacePct >= 50) alertTriggered = 'info';

    // Hard stop: reject the request
    if (summary.totalBudget > 0 && workspacePct >= 100) {
      await eventBus.publish(`workspace:${workspaceId}:events`, {
        type: 'budget.alert',
        payload: { agentId: body.agentId, level: 'hard_stop', usedPercent: workspacePct },
        timestamp: new Date().toISOString(),
      });
      return error(reply, 'Workspace budget exceeded — hard stop', 402);
    }

    await budgetRepository.record({
      workspaceId,
      agentId: body.agentId,
      tokensUsed: body.tokensUsed,
      costUsd: body.costUsd,
      modelUsed: body.modelUsed,
      cascadeLevel: 'agent',
      alertTriggered,
    });

    // Emit alert event if threshold crossed
    if (alertTriggered) {
      await eventBus.publish(`workspace:${workspaceId}:events`, {
        type: 'budget.alert',
        payload: { agentId: body.agentId, level: alertTriggered, usedPercent: workspacePct },
        timestamp: new Date().toISOString(),
      });
    }

    return success(reply, {
      recorded: true,
      agentSpent,
      workspaceSpent,
      workspaceUsedPercent: workspacePct,
      alertTriggered: alertTriggered ?? null,
    }, undefined, 201);
  });
}
