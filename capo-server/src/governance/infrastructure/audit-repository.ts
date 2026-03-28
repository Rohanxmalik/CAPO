import { query } from '../../shared/database.js';
import { rowsToCamel } from '../../shared/transform.js';

export const auditRepository = {
  async findByWorkspace(workspaceId: string, opts?: { limit?: number; offset?: number; agentId?: string }) {
    const limit = opts?.limit ?? 50;
    const offset = opts?.offset ?? 0;

    let sql = 'SELECT * FROM audit_log WHERE workspace_id = $1';
    const params: unknown[] = [workspaceId];

    if (opts?.agentId) {
      params.push(opts.agentId);
      sql += ` AND agent_id = $${params.length}`;
    }

    // Count total (respects agent filter)
    let countSql = 'SELECT COUNT(*) FROM audit_log WHERE workspace_id = $1';
    const countParams: unknown[] = [workspaceId];
    if (opts?.agentId) {
      countParams.push(opts.agentId);
      countSql += ` AND agent_id = $${countParams.length}`;
    }
    const countResult = await query(countSql, countParams);
    const total = Number((countResult.rows[0] as Record<string, unknown>).count);

    sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await query(sql, params);
    const entries = rowsToCamel(result.rows as Record<string, unknown>[]);

    return { entries, total, page: Math.floor(offset / limit) + 1, limit };
  },

  async create(data: {
    workspaceId: string;
    agentId?: string;
    agentName?: string;
    taskId?: string;
    action: string;
    toolUsed?: string;
    modelUsed?: string;
    tokensUsed?: number;
    costUsd?: number;
    gateType?: string;
    gateResult?: string;
    approvedBy?: string;
    details?: string;
  }) {
    await query(
      `INSERT INTO audit_log (
        workspace_id, agent_id, agent_name, task_id, action, tool_used,
        model_used, tokens_used, cost_usd, gate_type, gate_result,
        approved_by, details
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, COALESCE($11, 'no_gate'), $12, $13)`,
      [
        data.workspaceId,
        data.agentId ?? null,
        data.agentName ?? null,
        data.taskId ?? null,
        data.action,
        data.toolUsed ?? null,
        data.modelUsed ?? null,
        data.tokensUsed ?? null,
        data.costUsd ?? null,
        data.gateType ?? null,
        data.gateResult ?? null,
        data.approvedBy ?? null,
        data.details ?? null,
      ]
    );
  },
};
