export type CascadeLevel = 'organization' | 'division' | 'department' | 'team' | 'agent';
export type AlertLevel = 'info' | 'warning' | 'throttle' | 'soft_stop' | 'hard_stop';
export type BudgetMode = 'paid' | 'zero_dollar' | 'hybrid';

export interface BudgetEntry {
  id: string;
  agentId: string;
  tokensUsed: number;
  costUsd: number;
  modelUsed: string;
  cascadeLevel: CascadeLevel;
  alertTriggered?: AlertLevel;
  timestamp: string;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  usedPercent: number;
  mode: BudgetMode;
  byAgent: Array<{
    agentId: string;
    agentName: string;
    model: string;
    apiKeySource: 'platform' | 'user' | 'free';
    tokensUsed: number;
    costUsd: number;
  }>;
  byProvider: Array<{
    provider: string;
    costUsd: number;
    percent: number;
  }>;
  dailyCosts: Array<{
    date: string;
    cost: number;
  }>;
}
