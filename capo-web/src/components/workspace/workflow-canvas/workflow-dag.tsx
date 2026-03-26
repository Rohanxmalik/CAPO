"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAgents } from "@/lib/hooks";
import { useAgentStore } from "@/lib/stores";
import { calculateDagLayout } from "@/lib/utils/dag-layout";
import { AgentFlowNode } from "./agent-flow-node";

const nodeTypes = { agentNode: AgentFlowNode };

export function WorkflowDag() {
  const { agents } = useAgents();
  const setSelectedAgent = useAgentStore((s) => s.setSelectedAgent);
  const positions = useMemo(() => calculateDagLayout(agents), [agents]);

  const nodes: Node[] = useMemo(
    () =>
      agents.map((agent) => {
        const pos = positions.find((p) => p.id === agent.id);
        return {
          id: agent.id,
          type: "agentNode",
          position: { x: pos?.x ?? 0, y: pos?.y ?? 0 },
          data: { agent },
        };
      }),
    [agents, positions]
  );

  const edges: Edge[] = useMemo(
    () =>
      agents
        .filter((a) => a.parentId)
        .map((agent) => ({
          id: `${agent.parentId}-${agent.id}`,
          source: agent.parentId!,
          target: agent.id,
          animated: agent.status === "busy" || agent.status === "active",
          style: {
            stroke:
              agent.status === "error"
                ? "#ef4444"
                : agent.status === "terminated"
                  ? "#6b7280"
                  : "#3b82f6",
            strokeWidth: 1.5,
          },
        })),
    [agents]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedAgent(node.id);
    },
    [setSelectedAgent]
  );

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="oklch(0.25 0.02 270)"
        />
        <Controls
          showInteractive={false}
          className="!bottom-12"
        />
        <MiniMap
          nodeColor={() => "oklch(0.65 0.2 260)"}
          maskColor="oklch(0.08 0.01 270 / 80%)"
          className="!bottom-12"
        />
      </ReactFlow>
    </div>
  );
}
