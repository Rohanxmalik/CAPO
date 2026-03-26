import { api } from './client';
import type { Project } from '@/lib/types';

export const projectsApi = {
  list: () =>
    api.get<Project[]>('/api/v1/workspaces'),

  get: (id: string) =>
    api.get<Project>(`/api/v1/workspaces/${id}`),

  create: (data: Partial<Project>) =>
    api.post<Project>('/api/v1/workspaces', data),

  delete: (id: string) =>
    api.delete(`/api/v1/workspaces/${id}`),
};
