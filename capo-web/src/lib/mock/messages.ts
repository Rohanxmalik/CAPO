import { ChatMessage } from '@/lib/types';

export const mockMessages: ChatMessage[] = [
  // Message 1: CEO delegates to managers
  {
    id: 'msg-001',
    senderId: 'ceo-001',
    senderName: 'CEO Agent',
    recipientId: 'cto-001',
    recipientName: 'CTO Manager',
    type: 'task',
    content:
      'Build a high-converting landing page. Components needed: hero section, features grid, pricing table, CTA buttons. Ensure WCAG 2.1 AA compliance and 80%+ test coverage. Timeline: 2 days.',
    model: 'claude-opus-4',
    tokensUsed: 450,
    costUsd: 0.067,
    timestamp: '2026-03-25T08:00:00Z',
  },

  // Message 2: CTO acknowledges and plans
  {
    id: 'msg-002',
    senderId: 'cto-001',
    senderName: 'CTO Manager',
    recipientId: 'ceo-001',
    recipientName: 'CEO Agent',
    type: 'task',
    content:
      'Understood. Assigning: Frontend Dev (hero + features), QA (tests + accessibility), Backend (if needed). Starting immediately. Will need design wireframe from CMO first.',
    model: 'claude-sonnet-4',
    tokensUsed: 280,
    costUsd: 0.042,
    timestamp: '2026-03-25T08:05:00Z',
  },

  // Message 3: CTO delegates to Frontend Dev
  {
    id: 'msg-003',
    senderId: 'cto-001',
    senderName: 'CTO Manager',
    recipientId: 'frontend-001',
    recipientName: 'Frontend Developer',
    type: 'task',
    content:
      'Priority task: Build hero section (gradient BG, headline, CTA button) and features grid (responsive, 3-column on desktop). Use Tailwind CSS, add animations. Tests required. Block on design wireframe from Designer.',
    model: 'claude-sonnet-4',
    tokensUsed: 320,
    costUsd: 0.048,
    toolCalls: [
      {
        name: 'GitHub',
        input: 'Create pull request template for task-004',
        output: 'PR template created successfully',
        duration: 2100,
        cost: 0.0,
      },
    ],
    timestamp: '2026-03-25T08:10:00Z',
  },

  // Message 4: CEO delegates to CMO
  {
    id: 'msg-004',
    senderId: 'ceo-001',
    senderName: 'CEO Agent',
    recipientId: 'cmo-001',
    recipientName: 'CMO Manager',
    type: 'task',
    content:
      'Landing page content project: 1) Research top 5 competitors (Researcher), 2) Write hero/features/CTA copy (Content Writer), 3) Design wireframe (Designer). Coordinate with CTO. Start immediately.',
    model: 'claude-opus-4',
    tokensUsed: 380,
    costUsd: 0.057,
    timestamp: '2026-03-25T08:00:30Z',
  },

  // Message 5: CMO delegates to Researcher
  {
    id: 'msg-005',
    senderId: 'cmo-001',
    senderName: 'CMO Manager',
    recipientId: 'researcher-001',
    recipientName: 'Research Analyst',
    type: 'task',
    content:
      'Analyze top 5 landing page competitors (Vercel, Netlify, AWS, Firebase, Heroku). Document: design patterns, CTAs, copy strategy, social proof methods. Due in 30 mins.',
    model: 'claude-sonnet-4',
    tokensUsed: 290,
    costUsd: 0.043,
    toolCalls: [
      {
        name: 'WebSearch',
        input: 'Search for Vercel landing page best practices',
        output: 'Found 15 relevant results about Vercel landing page design',
        duration: 3200,
        cost: 0.001,
      },
    ],
    timestamp: '2026-03-25T08:01:00Z',
  },

  // Message 6: Researcher reports back
  {
    id: 'msg-006',
    senderId: 'researcher-001',
    senderName: 'Research Analyst',
    recipientId: 'cmo-001',
    recipientName: 'CMO Manager',
    type: 'result',
    content:
      'Research complete. Key findings: All competitors use hero with gradient (60%+), social proof in fold, benefit-focused copy, CTAs are high-contrast. Full report in artifacts.',
    model: 'gpt-4o',
    tokensUsed: 2340,
    costUsd: 0.35,
    expandedPrompt:
      'Analyze landing page competitors and identify: design patterns, CTAs, copy strategy, social proof methods...',
    rawResponse:
      'Based on analysis of Vercel, Netlify, AWS Amplify, Firebase, and Heroku landing pages, the following patterns emerge...',
    timestamp: '2026-03-25T08:45:00Z',
  },

  // Message 7: CMO delegates to Content Writer
  {
    id: 'msg-007',
    senderId: 'cmo-001',
    senderName: 'CMO Manager',
    recipientId: 'content-001',
    recipientName: 'Content Writer',
    type: 'task',
    content:
      'Write landing page copy (hero headline, subheading, features descriptions, CTA text). Use researcher insights. Target: high-converting, benefit-focused, 200-400 words. SEO optimize.',
    model: 'claude-sonnet-4',
    tokensUsed: 310,
    costUsd: 0.046,
    timestamp: '2026-03-25T09:00:00Z',
  },

  // Message 8: Content Writer status update
  {
    id: 'msg-008',
    senderId: 'content-001',
    senderName: 'Content Writer',
    recipientId: 'cmo-001',
    recipientName: 'CMO Manager',
    type: 'question',
    content:
      'Hero copy drafted (3 versions). Which angle resonates most: "Deploy Faster", "Zero Downtime", or "Maximum Reliability"? Need guidance for final copy.',
    model: 'claude-sonnet-4',
    tokensUsed: 220,
    costUsd: 0.033,
    timestamp: '2026-03-25T09:35:00Z',
  },

  // Message 9: CMO provides guidance
  {
    id: 'msg-009',
    senderId: 'cmo-001',
    senderName: 'CMO Manager',
    recipientId: 'content-001',
    recipientName: 'Content Writer',
    type: 'result',
    content:
      'Go with "Deploy Faster" + social proof angle. It aligns with competitor research. Include case study mention. Complete by 10:30 AM.',
    model: 'claude-sonnet-4',
    tokensUsed: 180,
    costUsd: 0.027,
    timestamp: '2026-03-25T09:40:00Z',
  },

  // Message 10: CMO delegates to Designer
  {
    id: 'msg-010',
    senderId: 'cmo-001',
    senderName: 'CMO Manager',
    recipientId: 'designer-001',
    recipientName: 'UI Designer',
    type: 'task',
    content:
      'Create wireframe for landing page: hero (gradient BG, headline, CTA), features grid (3-col, icons), social proof, pricing. Mobile-responsive. Coordinate with Frontend Dev on breakpoints.',
    model: 'claude-sonnet-4',
    tokensUsed: 300,
    costUsd: 0.045,
    timestamp: '2026-03-25T09:15:00Z',
  },

  // Message 11: CTO to QA Engineer
  {
    id: 'msg-011',
    senderId: 'cto-001',
    senderName: 'CTO Manager',
    recipientId: 'qa-001',
    recipientName: 'QA Engineer',
    type: 'task',
    content:
      'QA tasks: 1) Write unit tests for hero + features components (80%+ coverage), 2) Run accessibility audit (WCAG 2.1 AA), 3) Test on mobile + desktop. Block on code completion.',
    model: 'claude-sonnet-4',
    tokensUsed: 270,
    costUsd: 0.040,
    timestamp: '2026-03-25T10:45:00Z',
  },

  // Message 12: Frontend Dev status (in progress)
  {
    id: 'msg-012',
    senderId: 'frontend-001',
    senderName: 'Frontend Developer',
    recipientId: 'cto-001',
    recipientName: 'CTO Manager',
    type: 'result',
    content:
      'Hero section 75% complete. Gradient BG working, CTA button styled, responsive on all breakpoints. Features grid component initialized. Waiting on designer for final specs.',
    model: 'claude-haiku-4',
    tokensUsed: 1840,
    costUsd: 0.18,
    toolCalls: [
      {
        name: 'Write',
        input: 'Create Hero.tsx component with gradient background',
        output: 'Hero.tsx created with Tailwind CSS styling',
        duration: 4200,
        cost: 0.0001,
      },
      {
        name: 'Edit',
        input: 'Add responsive styling for mobile breakpoints',
        output: 'Mobile breakpoints added successfully',
        duration: 2100,
        cost: 0.0001,
      },
    ],
    timestamp: '2026-03-25T11:30:00Z',
  },

  // Message 13: CFO monitoring budget
  {
    id: 'msg-013',
    senderId: 'cfo-001',
    senderName: 'CFO Manager',
    recipientId: 'ceo-001',
    recipientName: 'CEO Agent',
    type: 'question',
    content:
      'Budget status: Project has spent $6.92 of $100 budget (6.9%). Anthropic: $5.20 (75%), OpenAI: $1.42 (20%), Groq: $0.30 (5%). On track.',
    model: 'claude-sonnet-4',
    tokensUsed: 320,
    costUsd: 0.048,
    timestamp: '2026-03-25T11:45:00Z',
  },

  // Message 14: Frontend Dev escalation
  {
    id: 'msg-014',
    senderId: 'frontend-001',
    senderName: 'Frontend Developer',
    recipientId: 'cto-001',
    recipientName: 'CTO Manager',
    type: 'escalation',
    content:
      'Need clarification: Should features grid use hover animations or static? Designer specs unclear. This affects component architecture.',
    model: 'claude-haiku-4',
    tokensUsed: 210,
    costUsd: 0.021,
    timestamp: '2026-03-25T10:50:00Z',
  },

  // Message 15: CTO resolves escalation
  {
    id: 'msg-015',
    senderId: 'cto-001',
    senderName: 'CTO Manager',
    recipientId: 'frontend-001',
    recipientName: 'Frontend Developer',
    type: 'result',
    content:
      'Use subtle hover animations (scale 1.02, shadow increase). Requested from designer for final confirmation. Proceed with implementation.',
    model: 'claude-sonnet-4',
    tokensUsed: 240,
    costUsd: 0.036,
    timestamp: '2026-03-25T10:55:00Z',
  },
];
