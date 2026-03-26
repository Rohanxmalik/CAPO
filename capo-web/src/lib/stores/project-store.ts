import { create } from 'zustand';
import { Project } from '@/lib/types';
import { mockProjects } from '@/lib/mock';

interface ProjectStore {
  projects: Project[];
  activeProjectId: string;
  setActiveProject: (id: string) => void;
  getActiveProject: () => Project | undefined;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: mockProjects,
  activeProjectId: mockProjects[0]?.id ?? '',
  setActiveProject: (id) => set({ activeProjectId: id }),
  getActiveProject: () => get().projects.find((p) => p.id === get().activeProjectId),
}));
