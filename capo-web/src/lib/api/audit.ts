import { api } from './client';
import type { AuditEntry } from '@/lib/types';

export const auditApi = {
  list: (workspaceId: string, opts?: { limit?: number; offset?: number; agentId?: string }) => {
    const params = new URLSearchParams();
    if (opts?.limit) params.set('limit', String(opts.limit));
    if (opts?.offset) params.set('offset', String(opts.offset));
    if (opts?.agentId) params.set('agentId', opts.agentId);
    const qs = params.toString();
    return api.get<AuditEntry[]>(`/api/v1/workspaces/${workspaceId}/audit${qs ? `?${qs}` : ''}`);
  },
};
