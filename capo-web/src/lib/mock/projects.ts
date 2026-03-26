import { Project } from '@/lib/types';

export const mockProjects: Project[] = [
  // Project 1: Active landing page project
  {
    id: 'project-001',
    name: 'My Landing Page',
    description:
      'Build a high-converting landing page with AI agents. Includes hero section, features grid, pricing table, and CTA buttons.',
    status: 'active',
    budget: 100,
    spent: 14.32,
    teamMembers: [
      {
        id: 'user-001',
        name: 'John Developer',
        email: 'john@example.com',
        role: 'admin',
      },
      {
        id: 'user-002',
        name: 'Sarah Designer',
        email: 'sarah@example.com',
        role: 'manager',
      },
      {
        id: 'user-003',
        name: 'Mike QA',
        email: 'mike@example.com',
        role: 'viewer',
      },
    ],
    agentCount: 12,
    taskCount: 8,
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-25T11:45:00Z',
  },

  // Project 2: Paused documentation project
  {
    id: 'project-002',
    name: 'API Documentation',
    description:
      'Generate comprehensive API documentation for backend services. Include endpoint specs, authentication, rate limiting, and examples.',
    status: 'paused',
    budget: 50,
    spent: 8.5,
    teamMembers: [
      {
        id: 'user-001',
        name: 'John Developer',
        email: 'john@example.com',
        role: 'admin',
      },
    ],
    agentCount: 3,
    taskCount: 5,
    createdAt: '2026-03-15T14:00:00Z',
    updatedAt: '2026-03-22T09:30:00Z',
  },

  // Project 3: Completed research project
  {
    id: 'project-003',
    name: 'Q1 Research Report',
    description:
      'Comprehensive market research report analyzing industry trends, competitor landscape, and emerging technologies for Q1 2026.',
    status: 'completed',
    budget: 75,
    spent: 62.4,
    teamMembers: [
      {
        id: 'user-004',
        name: 'Emma Researcher',
        email: 'emma@example.com',
        role: 'admin',
      },
      {
        id: 'user-005',
        name: 'Lisa Analyst',
        email: 'lisa@example.com',
        role: 'manager',
      },
    ],
    agentCount: 5,
    taskCount: 12,
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-03-24T16:00:00Z',
  },
];
