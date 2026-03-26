'use client';

import { useMemo } from 'react';
import { useProjectStore } from '@/lib/stores';

export function useProject() {
  const projects = useProjectStore((s) => s.projects);
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const setActiveProject = useProjectStore((s) => s.setActiveProject);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId),
    [projects, activeProjectId]
  );

  return { projects, activeProject, activeProjectId, setActiveProject };
}
