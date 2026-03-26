import { api } from './client';
import type { Agent } from '@/lib/types';

export const agentsApi = {
  list: (workspaceId: string) =>
    api.get<Agent[]>(`/api/v1/workspaces/${workspaceId}/agents`),

  get: (workspaceId: string, agentId: string) =>
    api.get<Agent>(`/api/v1/workspaces/${workspaceId}/agents/${agentId}`),

  create: (workspaceId: string, data: Partial<Agent>) =>
    api.post<Agent>(`/api/v1/workspaces/${workspaceId}/agents`, data),

  update: (workspaceId: string, agentId: string, data: Partial<Agent>) =>
    api.patch<Agent>(`/api/v1/workspaces/${workspaceId}/agents/${agentId}`, data),

  delete: (workspaceId: string, agentId: string) =>
    api.delete(`/api/v1/workspaces/${workspaceId}/agents/${agentId}`),
};
