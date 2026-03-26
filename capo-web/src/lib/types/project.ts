export type ProjectStatus = 'active' | 'paused' | 'completed' | 'archived';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  budget: number;
  spent: number;
  teamMembers: TeamMember[];
  agentCount: number;
  taskCount: number;
  createdAt: string;
  updatedAt: string;
}
