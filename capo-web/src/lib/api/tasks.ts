import { api } from './client';
import type { Task } from '@/lib/types';

export const tasksApi = {
  list: (workspaceId: string, filters?: { status?: string; assignedTo?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.assignedTo) params.set('assignedTo', filters.assignedTo);
    const qs = params.toString();
    return api.get<Task[]>(`/api/v1/workspaces/${workspaceId}/tasks${qs ? `?${qs}` : ''}`);
  },

  get: (workspaceId: string, taskId: string) =>
    api.get<Task>(`/api/v1/workspaces/${workspaceId}/tasks/${taskId}`),

  create: (workspaceId: string, data: Partial<Task>) =>
    api.post<Task>(`/api/v1/workspaces/${workspaceId}/tasks`, data),

  update: (workspaceId: string, taskId: string, data: Partial<Task>) =>
    api.patch<Task>(`/api/v1/workspaces/${workspaceId}/tasks/${taskId}`, data),

  claim: (workspaceId: string, agentId: string, taskType?: string) =>
    api.post<Task | null>(`/api/v1/workspaces/${workspaceId}/tasks/claim`, { agentId, taskType }),
};
