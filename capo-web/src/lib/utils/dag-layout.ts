import { Agent } from '@/lib/types';

interface NodePosition {
  id: string;
  x: number;
  y: number;
}

export function calculateDagLayout(agents: Agent[]): NodePosition[] {
  const tiers: Map<number, Agent[]> = new Map();

  // Group by hierarchy depth
  function getDepth(agent: Agent): number {
    if (!agent.parentId) return 0;
    const parent = agents.find((a) => a.id === agent.parentId);
    return parent ? getDepth(parent) + 1 : 0;
  }

  agents.forEach((agent) => {
    const depth = getDepth(agent);
    if (!tiers.has(depth)) tiers.set(depth, []);
    tiers.get(depth)!.push(agent);
  });

  const positions: NodePosition[] = [];
  const horizontalSpacing = 280;
  const verticalSpacing = 180;

  tiers.forEach((tierAgents, depth) => {
    const totalWidth = (tierAgents.length - 1) * horizontalSpacing;
    const startX = -totalWidth / 2;

    tierAgents.forEach((agent, index) => {
      positions.push({
        id: agent.id,
        x: startX + index * horizontalSpacing,
        y: depth * verticalSpacing,
      });
    });
  });

  return positions;
}
