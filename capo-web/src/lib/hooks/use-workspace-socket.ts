'use client';

import { useEffect, useRef } from 'react';
import { WorkspaceSocket } from '@/lib/api/websocket';
import { useAgentStore } from '@/lib/stores';
import type { WebSocketEvent, AgentStatus } from '@/lib/types';

/**
 * Connects a WebSocket to the active workspace and dispatches
 * incoming events to the appropriate Zustand stores.
 */
export function useWorkspaceSocket(workspaceId: string | undefined) {
  const socketRef = useRef<WorkspaceSocket | null>(null);
  const updateAgentStatus = useAgentStore((s) => s.updateAgentStatus);

  useEffect(() => {
    if (!workspaceId) return;

    const socket = new WorkspaceSocket(workspaceId);
    socketRef.current = socket;

    const unsubscribe = socket.onEvent((event: WebSocketEvent) => {
      switch (event.type) {
        case 'agent.status': {
          const { agentId, status } = event.payload as {
            agentId: string;
            status: AgentStatus;
          };
          updateAgentStatus(agentId, status);
          break;
        }
        case 'budget.alert': {
          // Budget alerts can be handled by a notification system later
          break;
        }
        // task.update, task.completed, workflow.* handled similarly
        default:
          break;
      }
    });

    socket.connect();

    return () => {
      unsubscribe();
      socket.disconnect();
    };
  }, [workspaceId, updateAgentStatus]);
}
