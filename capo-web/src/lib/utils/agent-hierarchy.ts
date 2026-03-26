import { Agent } from '@/lib/types';

export interface AgentTreeNode {
  agent: Agent;
  children: AgentTreeNode[];
}

export function buildAgentTree(agents: Agent[]): AgentTreeNode[] {
  const agentMap = new Map<string, Agent>();
  agents.forEach((a) => agentMap.set(a.id, a));

  const rootAgents = agents.filter((a) => !a.parentId);

  function buildNode(agent: Agent): AgentTreeNode {
    const children = agents
      .filter((a) => a.parentId === agent.id)
      .map((child) => buildNode(child));
    return { agent, children };
  }

  return rootAgents.map((a) => buildNode(a));
}

export function flattenTree(nodes: AgentTreeNode[]): Agent[] {
  const result: Agent[] = [];
  function walk(node: AgentTreeNode) {
    result.push(node.agent);
    node.children.forEach(walk);
  }
  nodes.forEach(walk);
  return result;
}
