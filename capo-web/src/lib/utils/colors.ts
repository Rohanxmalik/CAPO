import type { AgentStatus, ModelProvider } from '@/lib/types';

export const statusColors: Record<AgentStatus, string> = {
  active: '#22c55e',
  idle: '#eab308',
  busy: '#3b82f6',
  error: '#ef4444',
  terminated: '#6b7280',
};

export const statusLabels: Record<AgentStatus, string> = {
  active: 'Active',
  idle: 'Idle',
  busy: 'Busy',
  error: 'Error',
  terminated: 'Terminated',
};

export const providerColors: Record<ModelProvider, string> = {
  anthropic: '#d4a574',
  openai: '#10a37f',
  google: '#4285f4',
  groq: '#f55036',
  ollama: '#ffffff',
  custom: '#8b5cf6',
};

export const budgetBarColor = (percent: number): string => {
  if (percent < 50) return '#22c55e';
  if (percent < 75) return '#eab308';
  if (percent < 90) return '#f97316';
  return '#ef4444';
};

export const messageTypeColors: Record<string, string> = {
  task: '#3b82f6',
  result: '#22c55e',
  question: '#eab308',
  escalation: '#ef4444',
  system: '#6b7280',
  user: '#8b5cf6',
};
