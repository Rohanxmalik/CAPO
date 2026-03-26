import { query } from '../../shared/database.js';
import { rowToCamel, rowsToCamel } from '../../shared/transform.js';

export interface WorkspaceRow {
  id: string;
  name: string;
  description: string | null;
  status: string;
  budget: number;
  spent: number;
  team_members: unknown[];
  agent_count: number;
  task_count: number;
  created_at: string;
  updated_at: string;
}

export const workspaceRepository = {
  async findAll() {
    const result = await query('SELECT * FROM workspaces ORDER BY created_at DESC');
    return rowsToCamel(result.rows);
  },

  async findById(id: string) {
    const result = await query('SELECT * FROM workspaces WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return rowToCamel(result.rows[0]);
  },

  async create(data: {
    id?: string;
    name: string;
    description?: string;
    status?: string;
    budget?: number;
    spent?: number;
    teamMembers?: unknown[];
    agentCount?: number;
    taskCount?: number;
  }) {
    const result = await query(
      `INSERT INTO workspaces (id, name, description, status, budget, spent, team_members, agent_count, task_count)
       VALUES (COALESCE($1, gen_random_uuid()), $2, $3, COALESCE($4, 'active'), COALESCE($5, 0), COALESCE($6, 0), $7, COALESCE($8, 0), COALESCE($9, 0))
       RETURNING *`,
      [
        data.id ?? null,
        data.name,
        data.description ?? null,
        data.status ?? null,
        data.budget ?? null,
        data.spent ?? null,
        JSON.stringify(data.teamMembers ?? []),
        data.agentCount ?? null,
        data.taskCount ?? null,
      ]
    );
    return rowToCamel(result.rows[0]);
  },

  async delete(id: string) {
    const result = await query('DELETE FROM workspaces WHERE id = $1 RETURNING id', [id]);
    return result.rowCount! > 0;
  },
};
