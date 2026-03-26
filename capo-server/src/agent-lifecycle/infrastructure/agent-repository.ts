import { query } from '../../shared/database.js';
import { rowToCamel, rowsToCamel, attachChildrenIds } from '../../shared/transform.js';

export interface AgentRow {
  id: string;
  workspace_id: string;
  name: string;
  display_name: string;
  type: string;
  role: string;
  status: string;
  parent_id: string | null;
  model_config: Record<string, unknown>;
  tool_permissions: unknown[];
  skills: string[];
  budget_config: Record<string, unknown>;
  memory_config: Record<string, unknown>;
  constraints: Record<string, unknown>;
  metrics: Record<string, unknown>;
  system_prompt: string | null;
  description: string | null;
  avatar: string | null;
  current_task: string | null;
  budget_used_percent: number;
  created_at: string;
  updated_at: string;
}

export const agentRepository = {
  async findByWorkspace(workspaceId: string) {
    const result = await query(
      'SELECT * FROM agents WHERE workspace_id = $1 ORDER BY created_at',
      [workspaceId]
    );
    const agents = rowsToCamel<Record<string, unknown>>(result.rows);
    return attachChildrenIds(agents as Array<{ id: string; parentId?: string; childrenIds?: string[] }>);
  },

  async findById(workspaceId: string, agentId: string) {
    const result = await query(
      'SELECT * FROM agents WHERE id = $1 AND workspace_id = $2',
      [agentId, workspaceId]
    );
    if (result.rows.length === 0) return null;
    return rowToCamel(result.rows[0]);
  },

  async create(data: {
    id?: string;
    workspaceId: string;
    name: string;
    displayName: string;
    type: string;
    role: string;
    status?: string;
    parentId?: string;
    modelConfig: Record<string, unknown>;
    toolPermissions?: unknown[];
    skills?: string[];
    budgetConfig: Record<string, unknown>;
    memoryConfig?: Record<string, unknown>;
    constraints?: Record<string, unknown>;
    metrics?: Record<string, unknown>;
    systemPrompt?: string;
    description?: string;
    avatar?: string;
    currentTask?: string;
    budgetUsedPercent?: number;
  }) {
    const result = await query(
      `INSERT INTO agents (
        id, workspace_id, name, display_name, type, role, status,
        parent_id, model_config, tool_permissions, skills, budget_config,
        memory_config, constraints, metrics, system_prompt, description,
        avatar, current_task, budget_used_percent
      ) VALUES (
        COALESCE($1, gen_random_uuid()), $2, $3, $4, $5, $6, COALESCE($7, 'idle'),
        $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17,
        $18, $19, COALESCE($20, 0)
      ) RETURNING *`,
      [
        data.id ?? null,
        data.workspaceId,
        data.name,
        data.displayName,
        data.type,
        data.role,
        data.status ?? null,
        data.parentId ?? null,
        JSON.stringify(data.modelConfig),
        JSON.stringify(data.toolPermissions ?? []),
        data.skills ?? [],
        JSON.stringify(data.budgetConfig),
        JSON.stringify(data.memoryConfig ?? {}),
        JSON.stringify(data.constraints ?? {}),
        JSON.stringify(data.metrics ?? {}),
        data.systemPrompt ?? null,
        data.description ?? null,
        data.avatar ?? null,
        data.currentTask ?? null,
        data.budgetUsedPercent ?? null,
      ]
    );
    return rowToCamel(result.rows[0]);
  },

  async update(workspaceId: string, agentId: string, data: Record<string, unknown>) {
    const setClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    const columnMap: Record<string, string> = {
      name: 'name',
      displayName: 'display_name',
      type: 'type',
      role: 'role',
      status: 'status',
      parentId: 'parent_id',
      modelConfig: 'model_config',
      toolPermissions: 'tool_permissions',
      skills: 'skills',
      budgetConfig: 'budget_config',
      memoryConfig: 'memory_config',
      constraints: 'constraints',
      metrics: 'metrics',
      systemPrompt: 'system_prompt',
      description: 'description',
      currentTask: 'current_task',
      budgetUsedPercent: 'budget_used_percent',
    };

    const jsonColumns = new Set([
      'modelConfig', 'toolPermissions', 'budgetConfig',
      'memoryConfig', 'constraints', 'metrics',
    ]);

    for (const [key, value] of Object.entries(data)) {
      const column = columnMap[key];
      if (!column) continue;
      setClauses.push(`${column} = $${paramIndex}`);
      values.push(jsonColumns.has(key) ? JSON.stringify(value) : value);
      paramIndex++;
    }

    if (setClauses.length === 0) return null;

    setClauses.push(`updated_at = NOW()`);
    values.push(agentId, workspaceId);

    const result = await query(
      `UPDATE agents SET ${setClauses.join(', ')}
       WHERE id = $${paramIndex} AND workspace_id = $${paramIndex + 1}
       RETURNING *`,
      values
    );
    if (result.rows.length === 0) return null;
    return rowToCamel(result.rows[0]);
  },

  async delete(workspaceId: string, agentId: string) {
    const result = await query(
      'DELETE FROM agents WHERE id = $1 AND workspace_id = $2 RETURNING id',
      [agentId, workspaceId]
    );
    return result.rowCount! > 0;
  },
};
