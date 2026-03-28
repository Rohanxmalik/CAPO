import { create } from 'zustand';
import { Agent, AgentStatus } from '@/lib/types';
import { mockAgents } from '@/lib/mock';
import { agentsApi } from '@/lib/api/agents';

interface AgentStore {
  agents: Agent[];
  selectedAgentId: string;
  loading: boolean;
  error: string | null;
  setSelectedAgent: (id: string) => void;
  getSelectedAgent: () => Agent | undefined;
  getAgentById: (id: string) => Agent | undefined;
  getAgentsByRole: (role: string) => Agent[];
  getRootAgent: () => Agent | undefined;
  getChildAgents: (parentId: string) => Agent[];
  updateAgentStatus: (id: string, status: AgentStatus) => void;
  fetchAgents: (workspaceId: string) => Promise<void>;
  setAgents: (agents: Agent[]) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: mockAgents,
  selectedAgentId: mockAgents[0]?.id ?? '',
  loading: false,
  error: null,
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
  setAgents: (agents) => set({ agents }),
  fetchAgents: async (workspaceId) => {
    set({ loading: true, error: null });
    try {
      const result = await agentsApi.list(workspaceId);
      if (result.data && result.data.length > 0) {
        set({ agents: result.data, loading: false });
      } else {
        // Fall back to mock data if API returns empty
        set({ loading: false });
      }
    } catch {
      // API not available — keep using mock data
      set({ loading: false, error: null });
    }
  },
}));
