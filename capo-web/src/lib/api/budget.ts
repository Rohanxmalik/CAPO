import { api } from './client';
import type { BudgetSummary } from '@/lib/types';

export const budgetApi = {
  getSummary: (workspaceId: string) =>
    api.get<BudgetSummary>(`/api/v1/workspaces/${workspaceId}/budget`),
};
