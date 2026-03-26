import { TaskStatus } from './task';

export type StepType = 'agent' | 'condition' | 'loop' | 'parallel' | 'map' | 'reduce' | 'human-approval' | 'webhook' | 'delay';

export interface WorkflowStep {
  id: string;
  type: StepType;
  label: string;
  agentId?: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  status?: TaskStatus;
}

export interface WorkflowMetrics {
  totalSteps: number;
  completedSteps: number;
  totalTokens: number;
  totalCost: number;
  elapsedTime: number;
  estimatedTimeRemaining?: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  edges: WorkflowEdge[];
  status: 'draft' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';
  metrics: WorkflowMetrics;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}
