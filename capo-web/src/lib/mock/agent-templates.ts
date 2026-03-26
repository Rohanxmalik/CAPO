export interface AgentTemplate {
  id: string;
  name: string;
  displayName: string;
  description: string;
  type: string;
  role: string;
  defaultModel: string;
  defaultTemperature: number;
  skills: string[];
  icon?: string;
  category: string;
}

export const agentTemplates: AgentTemplate[] = [
  {
    id: 'template-ceo',
    name: 'ceo-agent',
    displayName: 'CEO Agent',
    description:
      'Strategic coordinator that decomposes user tasks into manageable sub-tasks and delegates to specialized managers. Monitors overall project health and escalations.',
    type: 'coordinator',
    role: 'ceo',
    defaultModel: 'claude-opus-4',
    defaultTemperature: 0.7,
    skills: [
      'strategic-planning',
      'task-decomposition',
      'synthesis',
      'escalation-handling',
    ],
    category: 'executive',
  },

  {
    id: 'template-cto',
    name: 'cto-manager',
    displayName: 'CTO Manager',
    description:
      'Technical leader overseeing engineering teams. Manages frontend, backend, and QA teams. Ensures code quality, architecture standards, and technical decisions.',
    type: 'coordinator',
    role: 'manager',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.5,
    skills: ['code-review', 'architecture', 'technical-planning', 'team-leadership'],
    category: 'management',
  },

  {
    id: 'template-cmo',
    name: 'cmo-manager',
    displayName: 'CMO Manager',
    description:
      'Marketing leader managing content, design, and research initiatives. Coordinates messaging, brand strategy, and market analysis.',
    type: 'coordinator',
    role: 'manager',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.7,
    skills: [
      'content-strategy',
      'market-analysis',
      'brand-management',
      'team-leadership',
    ],
    category: 'management',
  },

  {
    id: 'template-cfo',
    name: 'cfo-manager',
    displayName: 'CFO Manager',
    description:
      'Financial controller monitoring budget usage, cost optimization, and financial health across all agents. Provides spending insights and alerts.',
    type: 'analyst',
    role: 'manager',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.3,
    skills: [
      'financial-analysis',
      'budget-optimization',
      'cost-forecasting',
      'reporting',
    ],
    category: 'management',
  },

  {
    id: 'template-coo',
    name: 'coo-manager',
    displayName: 'COO Manager',
    description:
      'Operations leader focused on process optimization, workflow design, and team coordination. Ensures efficient execution and resource allocation.',
    type: 'ops',
    role: 'manager',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.5,
    skills: [
      'process-optimization',
      'workflow-design',
      'team-coordination',
      'systems-thinking',
    ],
    category: 'management',
  },

  {
    id: 'template-frontend',
    name: 'frontend-developer',
    displayName: 'Frontend Developer',
    description:
      'Senior frontend engineer implementing UI components and pages. Proficient in React, Next.js, Tailwind CSS. Follows best practices and test-driven development.',
    type: 'coder',
    role: 'worker',
    defaultModel: 'claude-haiku-4',
    defaultTemperature: 0.3,
    skills: [
      'coding-standards',
      'frontend-patterns',
      'test-driven-development',
      'responsive-design',
    ],
    category: 'engineering',
  },

  {
    id: 'template-backend',
    name: 'backend-developer',
    displayName: 'Backend Developer',
    description:
      'Senior backend engineer building scalable APIs and server-side logic. Expert in Node.js, Python, database design, and security.',
    type: 'coder',
    role: 'worker',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.3,
    skills: [
      'coding-standards',
      'backend-patterns',
      'database-design',
      'api-development',
    ],
    category: 'engineering',
  },

  {
    id: 'template-qa',
    name: 'qa-engineer',
    displayName: 'QA Engineer',
    description:
      'Quality assurance specialist focused on testing, code review, and accessibility audits. Ensures 80%+ test coverage and WCAG 2.1 AA compliance.',
    type: 'tester',
    role: 'worker',
    defaultModel: 'claude-haiku-4',
    defaultTemperature: 0.2,
    skills: [
      'test-driven-development',
      'e2e-testing',
      'code-review',
      'accessibility-audit',
    ],
    category: 'quality',
  },

  {
    id: 'template-researcher',
    name: 'research-analyst',
    displayName: 'Research Analyst',
    description:
      'Market research specialist conducting competitive analysis, trend analysis, and data gathering. Provides strategic insights for decision-making.',
    type: 'researcher',
    role: 'worker',
    defaultModel: 'gpt-4o',
    defaultTemperature: 0.5,
    skills: [
      'market-research',
      'competitive-analysis',
      'data-gathering',
      'insights-synthesis',
    ],
    category: 'research',
  },

  {
    id: 'template-content',
    name: 'content-writer',
    displayName: 'Content Writer',
    description:
      'Professional copywriter creating compelling marketing content. Skilled in SEO optimization, brand voice, and high-converting copywriting.',
    type: 'writer',
    role: 'worker',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.8,
    skills: ['content-writing', 'seo-optimization', 'copywriting', 'brand-voice'],
    category: 'content',
  },

  {
    id: 'template-designer',
    name: 'ui-designer',
    displayName: 'UI Designer',
    description:
      'User interface designer creating beautiful, accessible designs. Proficient in wireframing, design systems, and modern design principles.',
    type: 'designer',
    role: 'worker',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.7,
    skills: ['ui-design', 'wireframing', 'design-systems', 'accessibility'],
    category: 'design',
  },

  {
    id: 'template-security',
    name: 'security-auditor',
    displayName: 'Security Auditor',
    description:
      'Security specialist performing vulnerability assessments, penetration testing, and compliance audits. Ensures code security and data protection.',
    type: 'reviewer',
    role: 'worker',
    defaultModel: 'claude-sonnet-4',
    defaultTemperature: 0.3,
    skills: [
      'vulnerability-assessment',
      'penetration-testing',
      'compliance-audit',
      'security-review',
    ],
    category: 'security',
  },
];
