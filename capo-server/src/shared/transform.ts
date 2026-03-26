/**
 * Converts snake_case database rows to camelCase for API responses.
 * Handles nested JSONB columns that are already camelCase.
 */

const snakeToCamel = (s: string): string =>
  s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

// Columns stored as JSONB that are already camelCase or should be passed through
const JSON_PASSTHROUGH = new Set([
  'model_config',
  'tool_permissions',
  'budget_config',
  'memory_config',
  'constraints',
  'metrics',
  'result',
  'team_members',
  'metadata',
  'access_control',
]);

export function rowToCamel<T>(row: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    const camelKey = snakeToCamel(key);
    result[camelKey] = JSON_PASSTHROUGH.has(key) ? value : value;
  }
  return result as T;
}

export function rowsToCamel<T>(rows: Record<string, unknown>[]): T[] {
  return rows.map((r) => rowToCamel<T>(r));
}

/**
 * Build a children_ids array from parent_id relationships.
 * Called after fetching all agents in a workspace.
 */
export function attachChildrenIds<T extends { id: string; parentId?: string; childrenIds?: string[] }>(
  agents: T[]
): T[] {
  const childrenMap = new Map<string, string[]>();
  for (const agent of agents) {
    if (agent.parentId) {
      const existing = childrenMap.get(agent.parentId) ?? [];
      existing.push(agent.id);
      childrenMap.set(agent.parentId, existing);
    }
  }
  return agents.map((agent) => ({
    ...agent,
    childrenIds: childrenMap.get(agent.id) ?? [],
  }));
}
