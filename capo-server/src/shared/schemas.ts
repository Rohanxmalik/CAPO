import { z } from 'zod';

// Agent schemas
export const createAgentSchema = z.object({
  name: z.string().min(1).max(255),
  displayName: z.string().min(1).max(255),
  type: z.string().min(1),
  role: z.enum(['leader', 'worker', 'peer']),
  status: z.enum(['active', 'idle', 'busy', 'error', 'terminated']).optional(),
  parentId: z.string().uuid().optional().nullable(),
  modelConfig: z.object({
    provider: z.string().min(1),
    model: z.string().min(1),
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().int().positive().optional(),
    fallback: z.string().optional(),
  }),
  toolPermissions: z.array(z.unknown()).optional(),
  skills: z.array(z.string()).optional(),
  budgetConfig: z.object({
    maxTokens: z.number().int().positive().optional(),
    maxCostUsd: z.number().nonnegative().optional(),
    alertThresholds: z.array(z.number()).optional(),
  }),
  memoryConfig: z.record(z.unknown()).optional(),
  constraints: z.record(z.unknown()).optional(),
  systemPrompt: z.string().optional(),
  description: z.string().optional(),
  avatar: z.string().optional(),
});

export const updateAgentSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  displayName: z.string().min(1).max(255).optional(),
  type: z.string().min(1).optional(),
  role: z.enum(['leader', 'worker', 'peer']).optional(),
  status: z.enum(['active', 'idle', 'busy', 'error', 'terminated']).optional(),
  parentId: z.string().uuid().optional().nullable(),
  modelConfig: z.record(z.unknown()).optional(),
  toolPermissions: z.array(z.unknown()).optional(),
  skills: z.array(z.string()).optional(),
  budgetConfig: z.record(z.unknown()).optional(),
  memoryConfig: z.record(z.unknown()).optional(),
  constraints: z.record(z.unknown()).optional(),
  systemPrompt: z.string().optional(),
  description: z.string().optional(),
  currentTask: z.string().optional().nullable(),
  budgetUsedPercent: z.number().min(0).max(100).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

// Task schemas
export const createTaskSchema = z.object({
  title: z.string().min(1).max(500),
  objective: z.string().min(1),
  context: z.string().optional(),
  type: z.string().min(1),
  priority: z.enum(['critical', 'high', 'medium', 'low']).optional(),
  status: z.enum(['pending', 'claimed', 'running', 'completed', 'failed', 'cancelled']).optional(),
  assignedTo: z.string().uuid().optional(),
  createdBy: z.string().uuid().optional(),
  dependencies: z.array(z.string().uuid()).optional(),
});

export const claimTaskSchema = z.object({
  agentId: z.string().uuid(),
  taskType: z.string().optional(),
});

// Workspace schemas
export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  status: z.enum(['active', 'paused', 'completed', 'archived']).optional(),
  budget: z.number().nonnegative().optional(),
  teamMembers: z.array(z.unknown()).optional(),
});

// Memory schemas
export const createMemorySchema = z.object({
  layer: z.enum(['working', 'episodic', 'semantic', 'procedural']),
  content: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
  accessControl: z.record(z.unknown()).optional(),
  expiresAt: z.string().datetime().optional(),
});

// Budget schemas
export const recordBudgetSchema = z.object({
  agentId: z.string().uuid(),
  tokensUsed: z.number().int().nonnegative(),
  costUsd: z.number().nonnegative(),
  modelUsed: z.string().optional(),
});
