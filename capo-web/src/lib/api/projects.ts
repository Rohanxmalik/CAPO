import { api } from './client';
import type { Project } from '@/lib/types';

export const projectsApi = {
  list: () =>
    api.get<Project[]>('/api/v1/workspaces'),

  get: (id: string) =>
    api.get<Project>(`/api/v1/workspaces/${id}`),

  create: (data: Partial<Project>) =>
    api.post<Project>('/api/v1/workspaces', data),

  update: (id: string, data: Partial<Project>) =>
    api.patch<Project>(`/api/v1/workspaces/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/workspaces/${id}`),
};
