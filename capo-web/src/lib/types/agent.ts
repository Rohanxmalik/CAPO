export type AgentType = 'coordinator' | 'coder' | 'tester' | 'reviewer' | 'researcher' | 'writer' | 'designer' | 'analyst' | 'ops';

export type AgentRole = 'ceo' | 'manager' | 'worker';

export type AgentStatus = 'active' | 'idle' | 'busy' | 'error' | 'terminated';

export type ModelProvider = 'anthropic' | 'openai' | 'google' | 'groq' | 'ollama' | 'custom';

export interface ModelConfig {
  provider: ModelProvider;
  model: string;
  displayName: string;
  fallbackModel?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface BudgetConfig {
  maxTokens: number;
  maxCostUsd: number;
  alertThresholds: number[]; // [50, 75, 90, 95, 100]
  autoDowngradeAt?: number; // percentage
  period: 'task' | 'daily' | 'weekly' | 'monthly';
}

export interface ToolPermission {
  name: string;
  category: 'code' | 'browser' | 'github' | 'api' | 'system' | 'data';
  permission: 'auto' | 'ask' | 'deny';
}

export interface MemoryConfig {
  working: boolean;
  episodic: boolean;
  semantic: boolean | 'read-only';
  procedural: boolean | 'read-only';
}

export interface ConstraintSet {
  maxConcurrentTasks: number;
  maxFileSizeLines: number;
  requiredTests: boolean;
  codeReviewRequired: boolean;
  allowedActions?: string[];
  deniedActions?: string[];
}

export interface AgentMetrics {
  tasksCompleted: number;
  tasksFailed: number;
  tokensUsed: number;
  costUsd: number;
  averageExecutionTime: number; // ms
  successRate: number; // 0-100
  health: 'healthy' | 'degraded' | 'critical';
}

export interface Agent {
  id: string;
  name: string;
  displayName: string;
  type: AgentType;
  role: AgentRole;
  status: AgentStatus;
  model: ModelConfig;
  parentId?: string;
  childrenIds: string[];
  tools: ToolPermission[];
  skills: string[];
  budget: BudgetConfig;
  memory: MemoryConfig;
  constraints: ConstraintSet;
  metrics: AgentMetrics;
  systemPrompt: string;
  description: string;
  avatar?: string;
  currentTask?: string;
  budgetUsedPercent: number;
  createdAt: string;
}
