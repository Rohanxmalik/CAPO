import { create } from 'zustand';
import { Project } from '@/lib/types';
import { mockProjects } from '@/lib/mock';
import { projectsApi } from '@/lib/api/projects';

interface ProjectStore {
  projects: Project[];
  activeProjectId: string;
  loading: boolean;
  setActiveProject: (id: string) => void;
  getActiveProject: () => Project | undefined;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: mockProjects,
  activeProjectId: mockProjects[0]?.id ?? '',
  loading: false,
  setActiveProject: (id) => set({ activeProjectId: id }),
  getActiveProject: () => get().projects.find((p) => p.id === get().activeProjectId),
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const result = await projectsApi.list();
      if (result.data && result.data.length > 0) {
        set({ projects: result.data, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      // API not available — keep using mock data
      set({ loading: false });
    }
  },
}));
