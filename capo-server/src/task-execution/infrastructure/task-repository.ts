import { query, transaction } from '../../shared/database.js';
import { rowToCamel, rowsToCamel } from '../../shared/transform.js';

export const taskRepository = {
  async findByWorkspace(workspaceId: string, filters?: { status?: string; assignedTo?: string }) {
    let sql = 'SELECT * FROM tasks WHERE workspace_id = $1';
    const params: unknown[] = [workspaceId];

    if (filters?.status) {
      params.push(filters.status);
      sql += ` AND status = $${params.length}`;
    }
    if (filters?.assignedTo) {
      params.push(filters.assignedTo);
      sql += ` AND assigned_to = $${params.length}`;
    }

    sql += ' ORDER BY created_at DESC';
    const result = await query(sql, params);
    return rowsToCamel(result.rows as Record<string, unknown>[]);
  },

  async findById(workspaceId: string, taskId: string) {
    const result = await query(
      'SELECT * FROM tasks WHERE id = $1 AND workspace_id = $2',
      [taskId, workspaceId]
    );
    if (result.rows.length === 0) return null;
    return rowToCamel(result.rows[0] as Record<string, unknown>);
  },

  async create(data: {
    id?: string;
    workspaceId: string;
    workflowId?: string;
    title: string;
    objective: string;
    context?: string;
    type: string;
    priority?: string;
    status?: string;
    assignedTo?: string;
    createdBy?: string;
    dependencies?: string[];
    tokensUsed?: number;
    costUsd?: number;
  }) {
    const result = await query(
      `INSERT INTO tasks (
        id, workspace_id, workflow_id, title, objective, context,
        type, priority, status, assigned_to, created_by, dependencies,
        tokens_used, cost_usd
      ) VALUES (
        COALESCE($1, gen_random_uuid()), $2, $3, $4, $5, $6,
        $7, COALESCE($8, 'pending'), COALESCE($9, 'pending'), $10, $11, $12,
        COALESCE($13, 0), COALESCE($14, 0)
      ) RETURNING *`,
      [
        data.id ?? null,
        data.workspaceId,
        data.workflowId ?? null,
        data.title,
        data.objective,
        data.context ?? null,
        data.type,
        data.priority ?? null,
        data.status ?? null,
        data.assignedTo ?? null,
        data.createdBy ?? null,
        data.dependencies ?? [],
        data.tokensUsed ?? null,
        data.costUsd ?? null,
      ]
    );
    return rowToCamel(result.rows[0] as Record<string, unknown>);
  },

  /**
   * Atomic task checkout using SELECT FOR UPDATE SKIP LOCKED.
   * Returns null if no task available.
   */
  async claimNext(workspaceId: string, agentId: string, taskType?: string) {
    return transaction(async (client) => {
      let sql = `
        SELECT * FROM tasks
        WHERE workspace_id = $1 AND status = 'pending' AND assigned_to IS NULL
      `;
      const params: unknown[] = [workspaceId];

      if (taskType) {
        params.push(taskType);
        sql += ` AND type = $${params.length}`;
      }

      sql += ` ORDER BY
        CASE priority
          WHEN 'critical' THEN 0
          WHEN 'high' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'low' THEN 3
        END,
        created_at ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED`;

      const selectResult = await client.query(sql, params);
      if (selectResult.rows.length === 0) return null;

      const task = selectResult.rows[0] as Record<string, unknown>;
      const updateResult = await client.query(
        `UPDATE tasks SET status = 'in_progress', assigned_to = $1, claimed_at = NOW()
         WHERE id = $2 RETURNING *`,
        [agentId, task.id]
      );
      return rowToCamel(updateResult.rows[0] as Record<string, unknown>);
    });
  },

  async update(workspaceId: string, taskId: string, data: Record<string, unknown>) {
    const setClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    const columnMap: Record<string, string> = {
      title: 'title',
      objective: 'objective',
      status: 'status',
      assignedTo: 'assigned_to',
      result: 'result',
      tokensUsed: 'tokens_used',
      costUsd: 'cost_usd',
      priority: 'priority',
    };

    for (const [key, value] of Object.entries(data)) {
      const column = columnMap[key];
      if (!column) continue;
      setClauses.push(`${column} = $${paramIndex}`);
      values.push(key === 'result' ? JSON.stringify(value) : value);
      paramIndex++;
    }

    if (data.status === 'completed') {
      setClauses.push(`completed_at = NOW()`);
    }

    if (setClauses.length === 0) return null;

    values.push(taskId, workspaceId);
    const result = await query(
      `UPDATE tasks SET ${setClauses.join(', ')}
       WHERE id = $${paramIndex} AND workspace_id = $${paramIndex + 1}
       RETURNING *`,
      values
    );
    if (result.rows.length === 0) return null;
    return rowToCamel(result.rows[0] as Record<string, unknown>);
  },
};
