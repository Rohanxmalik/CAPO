export type TaskStatus = 'pending' | 'queued' | 'in_progress' | 'completed' | 'failed' | 'blocked' | 'cancelled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type TaskType = 'research' | 'code' | 'review' | 'test' | 'design' | 'content' | 'analysis' | 'coordination';

export interface TaskResult {
  output: string;
  artifacts?: string[];
  tokensUsed: number;
  costUsd: number;
  duration: number; // ms
}

export interface Task {
  id: string;
  workspaceId: string;
  workflowId?: string;
  title: string;
  objective: string;
  context?: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo?: string; // agent id
  createdBy: string; // agent id
  dependencies: string[]; // task ids
  result?: TaskResult;
  tokensUsed: number;
  costUsd: number;
  createdAt: string;
  claimedAt?: string;
  completedAt?: string;
}
