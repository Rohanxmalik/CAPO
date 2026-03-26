import { query } from '../../shared/database.js';
import { rowsToCamel } from '../../shared/transform.js';

export const budgetRepository = {
  async getSummary(workspaceId: string) {
    // Total workspace budget
    const wsResult = await query(
      'SELECT budget, spent FROM workspaces WHERE id = $1',
      [workspaceId]
    );
    const workspace = wsResult.rows[0] as { budget: number; spent: number } | undefined;
    const totalBudget = Number(workspace?.budget ?? 0);
    const totalSpent = Number(workspace?.spent ?? 0);

    // Per-agent breakdown
    const agentResult = await query(
      `SELECT a.id as agent_id, a.display_name as agent_name,
              (a.model_config->>'model') as model,
              COALESCE(SUM(b.tokens_used), 0)::int as tokens_used,
              COALESCE(SUM(b.cost_usd), 0)::float as cost_usd
       FROM agents a
       LEFT JOIN budget_entries b ON b.agent_id = a.id
       WHERE a.workspace_id = $1
       GROUP BY a.id, a.display_name, a.model_config
       ORDER BY cost_usd DESC`,
      [workspaceId]
    );

    const byAgent = agentResult.rows.map((r: Record<string, unknown>) => ({
      agentId: r.agent_id,
      agentName: r.agent_name,
      model: r.model,
      apiKeySource: 'platform',
      tokensUsed: Number(r.tokens_used),
      costUsd: Number(r.cost_usd),
    }));

    // Per-provider breakdown
    const providerResult = await query(
      `SELECT model_used as provider, SUM(cost_usd)::float as cost_usd
       FROM budget_entries WHERE workspace_id = $1
       GROUP BY model_used ORDER BY cost_usd DESC`,
      [workspaceId]
    );

    const byProvider = providerResult.rows.map((r: Record<string, unknown>) => ({
      provider: String(r.provider ?? 'unknown'),
      costUsd: Number(r.cost_usd),
      percent: totalSpent > 0 ? Math.round((Number(r.cost_usd) / totalSpent) * 100) : 0,
    }));

    // Daily costs (last 30 days)
    const dailyResult = await query(
      `SELECT DATE(created_at) as date, SUM(cost_usd)::float as cost
       FROM budget_entries WHERE workspace_id = $1
       AND created_at > NOW() - INTERVAL '30 days'
       GROUP BY DATE(created_at) ORDER BY date`,
      [workspaceId]
    );

    const dailyCosts = dailyResult.rows.map((r: Record<string, unknown>) => ({
      date: String(r.date),
      cost: Number(r.cost),
    }));

    return {
      totalBudget,
      totalSpent,
      remainingBudget: totalBudget - totalSpent,
      usedPercent: totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0,
      mode: totalBudget === 0 ? 'zero_dollar' : 'paid',
      byAgent,
      byProvider,
      dailyCosts,
    };
  },

  async record(data: {
    workspaceId: string;
    agentId: string;
    tokensUsed: number;
    costUsd: number;
    modelUsed?: string;
    cascadeLevel?: string;
    alertTriggered?: string;
  }) {
    await query(
      `INSERT INTO budget_entries (workspace_id, agent_id, tokens_used, cost_usd, model_used, cascade_level, alert_triggered)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [data.workspaceId, data.agentId, data.tokensUsed, data.costUsd, data.modelUsed ?? null, data.cascadeLevel ?? null, data.alertTriggered ?? null]
    );

    // Update workspace spent total
    await query(
      'UPDATE workspaces SET spent = spent + $1 WHERE id = $2',
      [data.costUsd, data.workspaceId]
    );
  },
};
