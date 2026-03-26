import { create } from 'zustand';

interface WorkspaceStore {
  leftPanelSize: number;
  rightPanelSize: number;
  isConfigDrawerOpen: boolean;
  configDrawerAgentId: string | null;
  setLeftPanelSize: (size: number) => void;
  setRightPanelSize: (size: number) => void;
  openConfigDrawer: (agentId: string) => void;
  closeConfigDrawer: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  leftPanelSize: 20,
  rightPanelSize: 25,
  isConfigDrawerOpen: false,
  configDrawerAgentId: null,
  setLeftPanelSize: (size) => set({ leftPanelSize: size }),
  setRightPanelSize: (size) => set({ rightPanelSize: size }),
  openConfigDrawer: (agentId) => set({ isConfigDrawerOpen: true, configDrawerAgentId: agentId }),
  closeConfigDrawer: () => set({ isConfigDrawerOpen: false, configDrawerAgentId: null }),
}));
