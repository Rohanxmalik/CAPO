"use client";

import { useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AgentRosterPanel } from "@/components/workspace/agent-roster/agent-roster-panel";
import { WorkflowCanvasPanel } from "@/components/workspace/workflow-canvas/workflow-canvas-panel";
import { ChatPanel } from "@/components/workspace/chat-panel/chat-panel";
import { AgentConfigDrawer } from "@/components/agent-config/agent-config-drawer";
import { useProjectStore } from "@/lib/stores";
import { useAgentStore } from "@/lib/stores";
import { useWorkspaceSocket } from "@/lib/hooks";

export default function WorkspacePage() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const fetchAgents = useAgentStore((s) => s.fetchAgents);

  // Fetch agents from API when workspace changes
  useEffect(() => {
    if (activeProjectId) {
      fetchAgents(activeProjectId);
    }
  }, [activeProjectId, fetchAgents]);

  // Connect WebSocket for real-time updates
  useWorkspaceSocket(activeProjectId);
  return (
    <>
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        <ResizablePanel defaultSize="18%" minSize="14%" maxSize="28%">
          <AgentRosterPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="52%" minSize="30%">
          <WorkflowCanvasPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="30%" minSize="20%" maxSize="40%">
          <ChatPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
      <AgentConfigDrawer />
    </>
  );
}
