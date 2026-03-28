import { query } from '../../shared/database.js';
import { rowToCamel, rowsToCamel } from '../../shared/transform.js';

export const memoryRepository = {
  async findByAgent(agentId: string, filters?: { layer?: string; limit?: number }) {
    let sql = 'SELECT * FROM memory_entries WHERE agent_id = $1';
    const params: unknown[] = [agentId];

    if (filters?.layer) {
      params.push(filters.layer);
      sql += ` AND layer = $${params.length}`;
    }

    sql += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      params.push(filters.limit);
      sql += ` LIMIT $${params.length}`;
    }

    const result = await query(sql, params);
    return rowsToCamel(result.rows as Record<string, unknown>[]);
  },

  async findById(id: string) {
    const result = await query('SELECT * FROM memory_entries WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return rowToCamel(result.rows[0] as Record<string, unknown>);
  },

  async create(data: {
    agentId: string;
    layer: string;
    content: string;
    metadata?: Record<string, unknown>;
    accessControl?: Record<string, unknown>;
    expiresAt?: string;
  }) {
    const result = await query(
      `INSERT INTO memory_entries (agent_id, layer, content, metadata, access_control, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.agentId,
        data.layer,
        data.content,
        JSON.stringify(data.metadata ?? {}),
        JSON.stringify(data.accessControl ?? { owner: true }),
        data.expiresAt ?? null,
      ]
    );
    return rowToCamel(result.rows[0] as Record<string, unknown>);
  },

  async delete(id: string) {
    const result = await query(
      'DELETE FROM memory_entries WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rowCount! > 0;
  },

  async deleteByAgent(agentId: string, layer?: string) {
    let sql = 'DELETE FROM memory_entries WHERE agent_id = $1';
    const params: unknown[] = [agentId];

    if (layer) {
      params.push(layer);
      sql += ` AND layer = $${params.length}`;
    }

    const result = await query(sql, params);
    return result.rowCount ?? 0;
  },

  async touchAccessed(id: string) {
    await query(
      'UPDATE memory_entries SET accessed_at = NOW() WHERE id = $1',
      [id]
    );
  },
};
