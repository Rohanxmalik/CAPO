'use client';

import { useMemo } from 'react';
import { useAgentStore } from '@/lib/stores';
import { buildAgentTree } from '@/lib/utils/agent-hierarchy';

export function useAgents() {
  const agents = useAgentStore((s) => s.agents);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const setSelectedAgent = useAgentStore((s) => s.setSelectedAgent);

  const tree = useMemo(() => buildAgentTree(agents), [agents]);
  const selectedAgent = useMemo(
    () => agents.find((a) => a.id === selectedAgentId),
    [agents, selectedAgentId]
  );

  return { agents, tree, selectedAgent, selectedAgentId, setSelectedAgent };
}
