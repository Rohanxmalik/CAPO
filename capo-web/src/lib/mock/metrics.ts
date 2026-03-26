export interface AgentMetricsRow {
  agentId: string;
  agentName: string;
  type: string;
  status: string;
  tasksCompleted: number;
  tasksFailed: number;
  successRate: number;
  tokensUsed: number;
  costUsd: number;
  averageExecutionTime: number;
  health: string;
}

export interface DailyCostEntry {
  date: string;
  cost: number;
}

export interface TokenDistribution {
  agentId: string;
  agentName: string;
  tokensUsed: number;
  percentage: number;
}

// Per-agent breakdown table data
export const agentMetricsBreakdown: AgentMetricsRow[] = [
  {
    agentId: 'ceo-001',
    agentName: 'CEO Agent',
    type: 'coordinator',
    status: 'active',
    tasksCompleted: 12,
    tasksFailed: 1,
    successRate: 92,
    tokensUsed: 45231,
    costUsd: 6.78,
    averageExecutionTime: 45000,
    health: 'healthy',
  },
  {
    agentId: 'cto-001',
    agentName: 'CTO Manager',
    type: 'coordinator',
    status: 'busy',
    tasksCompleted: 8,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 22100,
    costUsd: 3.31,
    averageExecutionTime: 30000,
    health: 'healthy',
  },
  {
    agentId: 'cmo-001',
    agentName: 'CMO Manager',
    type: 'coordinator',
    status: 'active',
    tasksCompleted: 6,
    tasksFailed: 1,
    successRate: 86,
    tokensUsed: 12450,
    costUsd: 1.87,
    averageExecutionTime: 25000,
    health: 'healthy',
  },
  {
    agentId: 'cfo-001',
    agentName: 'CFO Manager',
    type: 'analyst',
    status: 'idle',
    tasksCompleted: 3,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 5200,
    costUsd: 0.78,
    averageExecutionTime: 15000,
    health: 'healthy',
  },
  {
    agentId: 'coo-001',
    agentName: 'COO Manager',
    type: 'ops',
    status: 'idle',
    tasksCompleted: 2,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 3800,
    costUsd: 0.57,
    averageExecutionTime: 12000,
    health: 'healthy',
  },
  {
    agentId: 'frontend-001',
    agentName: 'Frontend Developer',
    type: 'coder',
    status: 'busy',
    tasksCompleted: 5,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 8920,
    costUsd: 0.89,
    averageExecutionTime: 60000,
    health: 'healthy',
  },
  {
    agentId: 'backend-001',
    agentName: 'Backend Developer',
    type: 'coder',
    status: 'idle',
    tasksCompleted: 3,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 6100,
    costUsd: 0.91,
    averageExecutionTime: 45000,
    health: 'healthy',
  },
  {
    agentId: 'qa-001',
    agentName: 'QA Engineer',
    type: 'tester',
    status: 'active',
    tasksCompleted: 4,
    tasksFailed: 1,
    successRate: 80,
    tokensUsed: 4100,
    costUsd: 0.0,
    averageExecutionTime: 20000,
    health: 'healthy',
  },
  {
    agentId: 'researcher-001',
    agentName: 'Research Analyst',
    type: 'researcher',
    status: 'active',
    tasksCompleted: 4,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 6340,
    costUsd: 0.95,
    averageExecutionTime: 35000,
    health: 'healthy',
  },
  {
    agentId: 'content-001',
    agentName: 'Content Writer',
    type: 'writer',
    status: 'busy',
    tasksCompleted: 3,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 3450,
    costUsd: 0.52,
    averageExecutionTime: 40000,
    health: 'healthy',
  },
  {
    agentId: 'designer-001',
    agentName: 'UI Designer',
    type: 'designer',
    status: 'active',
    tasksCompleted: 2,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 4200,
    costUsd: 0.63,
    averageExecutionTime: 50000,
    health: 'healthy',
  },
  {
    agentId: 'devops-001',
    agentName: 'DevOps Engineer',
    type: 'ops',
    status: 'terminated',
    tasksCompleted: 1,
    tasksFailed: 0,
    successRate: 100,
    tokensUsed: 1200,
    costUsd: 0.0,
    averageExecutionTime: 15000,
    health: 'healthy',
  },
];

// Time-series daily cost data (past 7 days)
export const dailyCosts: DailyCostEntry[] = [
  { date: '2026-03-19', cost: 1.23 },
  { date: '2026-03-20', cost: 2.45 },
  { date: '2026-03-21', cost: 1.89 },
  { date: '2026-03-22', cost: 2.67 },
  { date: '2026-03-23', cost: 1.56 },
  { date: '2026-03-24', cost: 2.34 },
  { date: '2026-03-25', cost: 2.18 },
];

// Token distribution by agent
export const tokenDistribution: TokenDistribution[] = [
  {
    agentId: 'ceo-001',
    agentName: 'CEO Agent',
    tokensUsed: 45231,
    percentage: 28.4,
  },
  {
    agentId: 'cto-001',
    agentName: 'CTO Manager',
    tokensUsed: 22100,
    percentage: 13.9,
  },
  {
    agentId: 'cmo-001',
    agentName: 'CMO Manager',
    tokensUsed: 12450,
    percentage: 7.8,
  },
  {
    agentId: 'frontend-001',
    agentName: 'Frontend Developer',
    tokensUsed: 8920,
    percentage: 5.6,
  },
  {
    agentId: 'researcher-001',
    agentName: 'Research Analyst',
    tokensUsed: 6340,
    percentage: 4.0,
  },
  {
    agentId: 'backend-001',
    agentName: 'Backend Developer',
    tokensUsed: 6100,
    percentage: 3.8,
  },
  {
    agentId: 'cfo-001',
    agentName: 'CFO Manager',
    tokensUsed: 5200,
    percentage: 3.3,
  },
  {
    agentId: 'designer-001',
    agentName: 'UI Designer',
    tokensUsed: 4200,
    percentage: 2.6,
  },
  {
    agentId: 'qa-001',
    agentName: 'QA Engineer',
    tokensUsed: 4100,
    percentage: 2.6,
  },
  {
    agentId: 'content-001',
    agentName: 'Content Writer',
    tokensUsed: 3450,
    percentage: 2.2,
  },
  {
    agentId: 'coo-001',
    agentName: 'COO Manager',
    tokensUsed: 3800,
    percentage: 2.4,
  },
  {
    agentId: 'devops-001',
    agentName: 'DevOps Engineer',
    tokensUsed: 1200,
    percentage: 0.8,
  },
];
