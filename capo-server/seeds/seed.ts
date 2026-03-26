/**
 * Seed script — inserts the exact mock data from capo-web into PostgreSQL.
 * Run: cd capo-server && npm run seed
 */
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? 'postgresql://capo:capo_dev_password@localhost:5432/capo',
});

const WORKSPACE_ID = 'a0000000-0000-0000-0000-000000000001';

const workspaces = [
  {
    id: WORKSPACE_ID,
    name: 'My Landing Page',
    description: 'Build a high-converting landing page with AI agents. Includes hero section, features grid, pricing table, and CTA buttons.',
    status: 'active',
    budget: 100,
    spent: 14.32,
    team_members: JSON.stringify([
      { id: 'user-001', name: 'John Developer', email: 'john@example.com', role: 'admin' },
      { id: 'user-002', name: 'Sarah Designer', email: 'sarah@example.com', role: 'manager' },
      { id: 'user-003', name: 'Mike QA', email: 'mike@example.com', role: 'viewer' },
    ]),
    agent_count: 12,
    task_count: 8,
    created_at: '2026-03-20T10:00:00Z',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000002',
    name: 'API Documentation',
    description: 'Generate comprehensive API documentation for backend services.',
    status: 'paused',
    budget: 50,
    spent: 8.5,
    team_members: JSON.stringify([
      { id: 'user-001', name: 'John Developer', email: 'john@example.com', role: 'admin' },
    ]),
    agent_count: 3,
    task_count: 5,
    created_at: '2026-03-15T14:00:00Z',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000003',
    name: 'Q1 Research Report',
    description: 'Comprehensive market research report analyzing industry trends for Q1 2026.',
    status: 'completed',
    budget: 75,
    spent: 62.4,
    team_members: JSON.stringify([
      { id: 'user-004', name: 'Emma Researcher', email: 'emma@example.com', role: 'admin' },
      { id: 'user-005', name: 'Lisa Analyst', email: 'lisa@example.com', role: 'manager' },
    ]),
    agent_count: 5,
    task_count: 12,
    created_at: '2026-03-01T08:00:00Z',
  },
];

const agents = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    name: 'ceo-agent',
    display_name: 'CEO Agent',
    type: 'coordinator',
    role: 'ceo',
    status: 'active',
    parent_id: null,
    model_config: { provider: 'anthropic', model: 'claude-opus-4', displayName: 'Claude Opus 4', temperature: 0.7, maxTokens: 8192 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Write', category: 'code', permission: 'auto' },
      { name: 'WebSearch', category: 'browser', permission: 'auto' },
    ],
    skills: ['strategic-planning', 'task-decomposition', 'synthesis'],
    budget_config: { maxTokens: 500000, maxCostUsd: 30, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: 'read-only', procedural: 'read-only' },
    constraints: { maxConcurrentTasks: 1, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: false },
    metrics: { tasksCompleted: 12, tasksFailed: 1, tokensUsed: 45231, costUsd: 6.78, averageExecutionTime: 45000, successRate: 92, health: 'healthy' },
    system_prompt: 'You are the CEO Agent responsible for strategic task decomposition and delegation.',
    description: 'Strategic coordinator that decomposes user tasks and delegates to specialized managers.',
    current_task: 'Coordinating landing page build',
    budget_used_percent: 22.6,
    created_at: '2026-03-20T10:00:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    name: 'cto-manager',
    display_name: 'CTO Manager',
    type: 'coordinator',
    role: 'manager',
    status: 'busy',
    parent_id: 'b0000000-0000-0000-0000-000000000001',
    model_config: { provider: 'anthropic', model: 'claude-sonnet-4', displayName: 'Claude Sonnet 4', temperature: 0.5, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Write', category: 'code', permission: 'auto' },
      { name: 'Bash', category: 'system', permission: 'ask' },
      { name: 'GitHub', category: 'github', permission: 'auto' },
    ],
    skills: ['code-review', 'architecture', 'technical-planning'],
    budget_config: { maxTokens: 200000, maxCostUsd: 10, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: 'read-only', procedural: 'read-only' },
    constraints: { maxConcurrentTasks: 2, maxFileSizeLines: 800, requiredTests: true, codeReviewRequired: true },
    metrics: { tasksCompleted: 8, tasksFailed: 0, tokensUsed: 22100, costUsd: 3.31, averageExecutionTime: 30000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are the CTO Manager overseeing all technical work.',
    description: 'Oversees all technical work including frontend, backend, and quality assurance.',
    current_task: 'Reviewing frontend implementation plan',
    budget_used_percent: 33.1,
    created_at: '2026-03-20T10:01:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    name: 'cmo-manager',
    display_name: 'CMO Manager',
    type: 'coordinator',
    role: 'manager',
    status: 'active',
    parent_id: 'b0000000-0000-0000-0000-000000000001',
    model_config: { provider: 'anthropic', model: 'claude-sonnet-4', displayName: 'Claude Sonnet 4', temperature: 0.7, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'WebSearch', category: 'browser', permission: 'auto' },
      { name: 'WebFetch', category: 'browser', permission: 'auto' },
    ],
    skills: ['content-strategy', 'market-analysis', 'brand-management'],
    budget_config: { maxTokens: 150000, maxCostUsd: 8, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: 'read-only', procedural: false },
    constraints: { maxConcurrentTasks: 2, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: false },
    metrics: { tasksCompleted: 6, tasksFailed: 1, tokensUsed: 12450, costUsd: 1.87, averageExecutionTime: 25000, successRate: 86, health: 'healthy' },
    system_prompt: 'You are the CMO Manager responsible for marketing, content, and market research.',
    description: 'Manages marketing, content, and research initiatives.',
    current_task: 'Overseeing content creation',
    budget_used_percent: 23.4,
    created_at: '2026-03-20T10:01:30Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    name: 'cfo-manager',
    display_name: 'CFO Manager',
    type: 'analyst',
    role: 'manager',
    status: 'idle',
    parent_id: 'b0000000-0000-0000-0000-000000000001',
    model_config: { provider: 'anthropic', model: 'claude-sonnet-4', displayName: 'Claude Sonnet 4', temperature: 0.3, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'WebSearch', category: 'browser', permission: 'auto' },
    ],
    skills: ['financial-analysis', 'budget-optimization', 'cost-forecasting'],
    budget_config: { maxTokens: 100000, maxCostUsd: 5, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: false, procedural: false },
    constraints: { maxConcurrentTasks: 1, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: false },
    metrics: { tasksCompleted: 3, tasksFailed: 0, tokensUsed: 5200, costUsd: 0.78, averageExecutionTime: 15000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are the CFO Manager responsible for monitoring budget and financial health.',
    description: 'Monitors budget usage and financial health across all agents.',
    current_task: null,
    budget_used_percent: 15.6,
    created_at: '2026-03-20T10:02:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    name: 'coo-manager',
    display_name: 'COO Manager',
    type: 'ops',
    role: 'manager',
    status: 'idle',
    parent_id: 'b0000000-0000-0000-0000-000000000001',
    model_config: { provider: 'openai', model: 'gpt-4o', displayName: 'GPT-4o', temperature: 0.5, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Bash', category: 'system', permission: 'ask' },
    ],
    skills: ['process-optimization', 'workflow-design', 'team-coordination'],
    budget_config: { maxTokens: 100000, maxCostUsd: 5, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: false, procedural: false },
    constraints: { maxConcurrentTasks: 1, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: false },
    metrics: { tasksCompleted: 2, tasksFailed: 0, tokensUsed: 3800, costUsd: 0.57, averageExecutionTime: 12000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are the COO Manager responsible for operational efficiency.',
    description: 'Oversees operational processes and workflow efficiency.',
    current_task: null,
    budget_used_percent: 11.4,
    created_at: '2026-03-20T10:02:30Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    name: 'frontend-developer',
    display_name: 'Frontend Developer',
    type: 'coder',
    role: 'worker',
    status: 'busy',
    parent_id: 'b0000000-0000-0000-0000-000000000002',
    model_config: { provider: 'anthropic', model: 'claude-haiku-4', displayName: 'Claude Haiku 4', temperature: 0.3, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Write', category: 'code', permission: 'auto' },
      { name: 'Edit', category: 'code', permission: 'auto' },
      { name: 'Bash', category: 'system', permission: 'ask' },
      { name: 'Grep', category: 'code', permission: 'auto' },
      { name: 'Glob', category: 'code', permission: 'auto' },
    ],
    skills: ['coding-standards', 'frontend-patterns', 'test-driven-development'],
    budget_config: { maxTokens: 200000, maxCostUsd: 10, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: 'read-only', procedural: 'read-only' },
    constraints: { maxConcurrentTasks: 3, maxFileSizeLines: 800, requiredTests: true, codeReviewRequired: true },
    metrics: { tasksCompleted: 5, tasksFailed: 0, tokensUsed: 8920, costUsd: 0.89, averageExecutionTime: 60000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are a senior frontend developer.',
    description: 'Implements UI components and pages with React/Next.js.',
    current_task: 'Building hero section component',
    budget_used_percent: 8.9,
    created_at: '2026-03-20T10:05:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000007',
    name: 'backend-developer',
    display_name: 'Backend Developer',
    type: 'coder',
    role: 'worker',
    status: 'idle',
    parent_id: 'b0000000-0000-0000-0000-000000000002',
    model_config: { provider: 'anthropic', model: 'claude-sonnet-4', displayName: 'Claude Sonnet 4', temperature: 0.3, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Write', category: 'code', permission: 'auto' },
      { name: 'Edit', category: 'code', permission: 'auto' },
      { name: 'Bash', category: 'system', permission: 'ask' },
    ],
    skills: ['coding-standards', 'backend-patterns', 'database-design'],
    budget_config: { maxTokens: 150000, maxCostUsd: 8, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: 'read-only', procedural: 'read-only' },
    constraints: { maxConcurrentTasks: 2, maxFileSizeLines: 800, requiredTests: true, codeReviewRequired: true },
    metrics: { tasksCompleted: 3, tasksFailed: 0, tokensUsed: 6100, costUsd: 0.91, averageExecutionTime: 45000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are a senior backend developer.',
    description: 'Implements API endpoints and server-side logic.',
    current_task: null,
    budget_used_percent: 11.4,
    created_at: '2026-03-20T10:05:30Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000008',
    name: 'qa-engineer',
    display_name: 'QA Engineer',
    type: 'tester',
    role: 'worker',
    status: 'active',
    parent_id: 'b0000000-0000-0000-0000-000000000002',
    model_config: { provider: 'groq', model: 'llama-4-scout', displayName: 'Llama 4 Scout', temperature: 0.2, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Bash', category: 'system', permission: 'auto' },
      { name: 'Grep', category: 'code', permission: 'auto' },
    ],
    skills: ['test-driven-development', 'e2e-testing', 'code-review'],
    budget_config: { maxTokens: 100000, maxCostUsd: 0, alertThresholds: [50,75,90,95,100], period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: false, procedural: false },
    constraints: { maxConcurrentTasks: 3, maxFileSizeLines: 800, requiredTests: true, codeReviewRequired: false },
    metrics: { tasksCompleted: 4, tasksFailed: 1, tokensUsed: 4100, costUsd: 0.0, averageExecutionTime: 20000, successRate: 80, health: 'healthy' },
    system_prompt: 'You are a QA engineer.',
    description: 'Tests code quality, runs automated tests, reviews for bugs.',
    current_task: 'Running accessibility audit',
    budget_used_percent: 4.1,
    created_at: '2026-03-20T10:06:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000009',
    name: 'researcher',
    display_name: 'Research Analyst',
    type: 'researcher',
    role: 'worker',
    status: 'active',
    parent_id: 'b0000000-0000-0000-0000-000000000003',
    model_config: { provider: 'openai', model: 'gpt-4o', displayName: 'GPT-4o', temperature: 0.5, maxTokens: 4096 },
    tool_permissions: [
      { name: 'WebSearch', category: 'browser', permission: 'auto' },
      { name: 'WebFetch', category: 'browser', permission: 'auto' },
      { name: 'Read', category: 'code', permission: 'auto' },
    ],
    skills: ['market-research', 'competitive-analysis', 'data-gathering'],
    budget_config: { maxTokens: 100000, maxCostUsd: 5, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: 'read-only', procedural: false },
    constraints: { maxConcurrentTasks: 2, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: false },
    metrics: { tasksCompleted: 4, tasksFailed: 0, tokensUsed: 6340, costUsd: 0.95, averageExecutionTime: 35000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are a research analyst.',
    description: 'Conducts competitive research and gathers market intelligence.',
    current_task: 'Analyzing competitor landing pages',
    budget_used_percent: 19.0,
    created_at: '2026-03-20T10:07:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-00000000000a',
    name: 'content-writer',
    display_name: 'Content Writer',
    type: 'writer',
    role: 'worker',
    status: 'busy',
    parent_id: 'b0000000-0000-0000-0000-000000000003',
    model_config: { provider: 'anthropic', model: 'claude-sonnet-4', displayName: 'Claude Sonnet 4', temperature: 0.8, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Write', category: 'code', permission: 'auto' },
      { name: 'WebSearch', category: 'browser', permission: 'auto' },
    ],
    skills: ['content-writing', 'seo-optimization', 'copywriting'],
    budget_config: { maxTokens: 100000, maxCostUsd: 5, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: 'read-only', procedural: false },
    constraints: { maxConcurrentTasks: 2, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: true },
    metrics: { tasksCompleted: 3, tasksFailed: 0, tokensUsed: 3450, costUsd: 0.52, averageExecutionTime: 40000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are a content writer.',
    description: 'Creates marketing copy, headlines, and content for digital assets.',
    current_task: 'Writing hero section copy',
    budget_used_percent: 10.4,
    created_at: '2026-03-20T10:07:30Z',
  },
  {
    id: 'b0000000-0000-0000-0000-00000000000b',
    name: 'ui-designer',
    display_name: 'UI Designer',
    type: 'designer',
    role: 'worker',
    status: 'active',
    parent_id: 'b0000000-0000-0000-0000-000000000003',
    model_config: { provider: 'anthropic', model: 'claude-sonnet-4', displayName: 'Claude Sonnet 4', temperature: 0.7, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Write', category: 'code', permission: 'auto' },
      { name: 'WebSearch', category: 'browser', permission: 'auto' },
    ],
    skills: ['ui-design', 'wireframing', 'design-systems'],
    budget_config: { maxTokens: 100000, maxCostUsd: 5, alertThresholds: [50,75,90,95,100], autoDowngradeAt: 90, period: 'monthly' },
    memory_config: { working: true, episodic: true, semantic: false, procedural: false },
    constraints: { maxConcurrentTasks: 2, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: true },
    metrics: { tasksCompleted: 2, tasksFailed: 0, tokensUsed: 4200, costUsd: 0.63, averageExecutionTime: 50000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are a UI designer.',
    description: 'Creates wireframes and visual designs for user interfaces.',
    current_task: 'Designing feature section layout',
    budget_used_percent: 12.6,
    created_at: '2026-03-20T10:08:00Z',
  },
  {
    id: 'b0000000-0000-0000-0000-00000000000c',
    name: 'devops-engineer',
    display_name: 'DevOps Engineer',
    type: 'ops',
    role: 'worker',
    status: 'terminated',
    parent_id: 'b0000000-0000-0000-0000-000000000005',
    model_config: { provider: 'groq', model: 'llama-4-maverick', displayName: 'Llama 4 Maverick', temperature: 0.2, maxTokens: 4096 },
    tool_permissions: [
      { name: 'Bash', category: 'system', permission: 'auto' },
      { name: 'Read', category: 'code', permission: 'auto' },
      { name: 'Write', category: 'code', permission: 'auto' },
    ],
    skills: ['docker', 'ci-cd', 'infrastructure'],
    budget_config: { maxTokens: 50000, maxCostUsd: 0, alertThresholds: [50,75,90,95,100], period: 'monthly' },
    memory_config: { working: true, episodic: false, semantic: false, procedural: false },
    constraints: { maxConcurrentTasks: 1, maxFileSizeLines: 800, requiredTests: false, codeReviewRequired: false },
    metrics: { tasksCompleted: 1, tasksFailed: 0, tokensUsed: 1200, costUsd: 0.0, averageExecutionTime: 15000, successRate: 100, health: 'healthy' },
    system_prompt: 'You are a DevOps engineer.',
    description: 'Manages deployment pipelines and infrastructure.',
    current_task: null,
    budget_used_percent: 2.4,
    created_at: '2026-03-20T10:08:30Z',
  },
];

const tasks = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    title: 'Design hero section layout',
    objective: 'Create a visually appealing hero section with headline, subheadline, CTA, and background image.',
    type: 'design',
    priority: 'high',
    status: 'in_progress',
    assigned_to: 'b0000000-0000-0000-0000-00000000000b',
    created_by: 'b0000000-0000-0000-0000-000000000003',
    tokens_used: 2100,
    cost_usd: 0.31,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    title: 'Write hero section copy',
    objective: 'Write compelling headline, subheadline, and CTA text for the hero section.',
    type: 'content',
    priority: 'high',
    status: 'in_progress',
    assigned_to: 'b0000000-0000-0000-0000-00000000000a',
    created_by: 'b0000000-0000-0000-0000-000000000003',
    tokens_used: 1800,
    cost_usd: 0.27,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    title: 'Implement hero React component',
    objective: 'Build the hero section component using Next.js, Tailwind, and shadcn/ui.',
    type: 'code',
    priority: 'high',
    status: 'in_progress',
    assigned_to: 'b0000000-0000-0000-0000-000000000006',
    created_by: 'b0000000-0000-0000-0000-000000000002',
    dependencies: ['c0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002'],
    tokens_used: 4500,
    cost_usd: 0.45,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000004',
    title: 'Competitor landing page analysis',
    objective: 'Analyze top 5 competitor landing pages for layout, messaging, and conversion patterns.',
    type: 'research',
    priority: 'medium',
    status: 'in_progress',
    assigned_to: 'b0000000-0000-0000-0000-000000000009',
    created_by: 'b0000000-0000-0000-0000-000000000003',
    tokens_used: 3200,
    cost_usd: 0.48,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000005',
    title: 'Run accessibility audit',
    objective: 'Perform WCAG 2.1 AA compliance audit on all implemented components.',
    type: 'test',
    priority: 'medium',
    status: 'in_progress',
    assigned_to: 'b0000000-0000-0000-0000-000000000008',
    created_by: 'b0000000-0000-0000-0000-000000000002',
    tokens_used: 1500,
    cost_usd: 0.0,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000006',
    title: 'Design features grid',
    objective: 'Create the features section with icon grid and descriptions.',
    type: 'design',
    priority: 'medium',
    status: 'pending',
    created_by: 'b0000000-0000-0000-0000-000000000003',
    tokens_used: 0,
    cost_usd: 0,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000007',
    title: 'Build pricing table component',
    objective: 'Implement responsive pricing table with 3 tiers.',
    type: 'code',
    priority: 'low',
    status: 'pending',
    created_by: 'b0000000-0000-0000-0000-000000000002',
    tokens_used: 0,
    cost_usd: 0,
  },
  {
    id: 'c0000000-0000-0000-0000-000000000008',
    title: 'SEO metadata optimization',
    objective: 'Optimize meta tags, OG images, and structured data.',
    type: 'content',
    priority: 'low',
    status: 'pending',
    created_by: 'b0000000-0000-0000-0000-000000000003',
    tokens_used: 0,
    cost_usd: 0,
  },
];

const auditEntries = [
  { agent_id: 'b0000000-0000-0000-0000-000000000001', agent_name: 'CEO Agent', action: 'task.decompose', model_used: 'claude-opus-4', tokens_used: 3200, cost_usd: 0.48, gate_type: null, gate_result: 'no_gate', details: 'Decomposed "Build landing page" into 8 sub-tasks' },
  { agent_id: 'b0000000-0000-0000-0000-000000000002', agent_name: 'CTO Manager', action: 'task.assign', model_used: 'claude-sonnet-4', tokens_used: 1200, cost_usd: 0.18, gate_type: null, gate_result: 'no_gate', details: 'Assigned hero component to Frontend Developer' },
  { agent_id: 'b0000000-0000-0000-0000-000000000006', agent_name: 'Frontend Developer', action: 'tool.execute', tool_used: 'Write', model_used: 'claude-haiku-4', tokens_used: 2100, cost_usd: 0.21, gate_type: 'action', gate_result: 'auto_approved', details: 'Created hero-section.tsx' },
  { agent_id: 'b0000000-0000-0000-0000-000000000008', agent_name: 'QA Engineer', action: 'tool.execute', tool_used: 'Bash', model_used: 'llama-4-scout', tokens_used: 800, cost_usd: 0.0, gate_type: 'action', gate_result: 'auto_approved', details: 'Running npm test' },
  { agent_id: 'b0000000-0000-0000-0000-00000000000c', agent_name: 'DevOps Engineer', action: 'agent.spawn', model_used: 'llama-4-maverick', tokens_used: 500, cost_usd: 0.0, gate_type: 'spawn', gate_result: 'approved', approved_by: 'CEO Agent', details: 'Spawned for CI pipeline setup' },
  { agent_id: 'b0000000-0000-0000-0000-00000000000c', agent_name: 'DevOps Engineer', action: 'agent.terminate', tokens_used: 0, cost_usd: 0.0, gate_type: null, gate_result: 'auto_approved', details: 'CI pipeline task completed, agent terminated' },
];

async function seed() {
  console.log('Seeding database...');

  // Clean existing data
  await pool.query('DELETE FROM budget_entries');
  await pool.query('DELETE FROM audit_log');
  await pool.query('DELETE FROM memory_entries');
  await pool.query('DELETE FROM tasks');
  await pool.query('DELETE FROM agents');
  await pool.query('DELETE FROM workspaces');

  // Insert workspaces
  for (const ws of workspaces) {
    await pool.query(
      `INSERT INTO workspaces (id, name, description, status, budget, spent, team_members, agent_count, task_count, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [ws.id, ws.name, ws.description, ws.status, ws.budget, ws.spent, ws.team_members, ws.agent_count, ws.task_count, ws.created_at]
    );
  }
  console.log(`  ${workspaces.length} workspaces inserted`);

  // Insert agents (all belong to first workspace)
  for (const a of agents) {
    await pool.query(
      `INSERT INTO agents (id, workspace_id, name, display_name, type, role, status, parent_id,
        model_config, tool_permissions, skills, budget_config, memory_config, constraints, metrics,
        system_prompt, description, current_task, budget_used_percent, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
      [
        a.id, WORKSPACE_ID, a.name, a.display_name, a.type, a.role, a.status, a.parent_id,
        JSON.stringify(a.model_config), JSON.stringify(a.tool_permissions), a.skills,
        JSON.stringify(a.budget_config), JSON.stringify(a.memory_config),
        JSON.stringify(a.constraints), JSON.stringify(a.metrics),
        a.system_prompt, a.description, a.current_task, a.budget_used_percent, a.created_at,
      ]
    );
  }
  console.log(`  ${agents.length} agents inserted`);

  // Insert tasks (all belong to first workspace)
  for (const t of tasks) {
    await pool.query(
      `INSERT INTO tasks (id, workspace_id, title, objective, type, priority, status,
        assigned_to, created_by, dependencies, tokens_used, cost_usd)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        t.id, WORKSPACE_ID, t.title, t.objective, t.type, t.priority, t.status,
        (t as Record<string, unknown>).assigned_to ?? null,
        (t as Record<string, unknown>).created_by ?? null,
        (t as Record<string, unknown>).dependencies ?? [],
        t.tokens_used, t.cost_usd,
      ]
    );
  }
  console.log(`  ${tasks.length} tasks inserted`);

  // Insert audit entries
  for (const a of auditEntries) {
    await pool.query(
      `INSERT INTO audit_log (workspace_id, agent_id, agent_name, action, tool_used, model_used,
        tokens_used, cost_usd, gate_type, gate_result, approved_by, details)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        WORKSPACE_ID, a.agent_id, a.agent_name, a.action, a.tool_used ?? null,
        a.model_used ?? null, a.tokens_used, a.cost_usd, a.gate_type,
        a.gate_result, (a as Record<string, unknown>).approved_by ?? null, a.details,
      ]
    );
  }
  console.log(`  ${auditEntries.length} audit entries inserted`);

  console.log('Seed complete!');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
