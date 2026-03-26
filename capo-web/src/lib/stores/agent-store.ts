import { create } from 'zustand';
import { Agent, AgentStatus } from '@/lib/types';
import { mockAgents } from '@/lib/mock';

interface AgentStore {
  agents: Agent[];
  selectedAgentId: string;
  setSelectedAgent: (id: string) => void;
  getSelectedAgent: () => Agent | undefined;
  getAgentById: (id: string) => Agent | undefined;
  getAgentsByRole: (role: string) => Agent[];
  getRootAgent: () => Agent | undefined;
  getChildAgents: (parentId: string) => Agent[];
  updateAgentStatus: (id: string, status: AgentStatus) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: mockAgents,
  selectedAgentId: mockAgents[0]?.id ?? '',
  setSelectedAgent: (id) => set({ selectedAgentId: id }),
  getSelectedAgent: () => get().agents.find((a) => a.id === get().selectedAgentId),
  getAgentById: (id) => get().agents.find((a) => a.id === id),
  getAgentsByRole: (role) => get().agents.filter((a) => a.role === role),
  getRootAgent: () => get().agents.find((a) => a.role === 'ceo'),
  getChildAgents: (parentId) => get().agents.filter((a) => a.parentId === parentId),
  updateAgentStatus: (id, status) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
}));
