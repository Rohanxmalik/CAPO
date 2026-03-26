"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import type { Agent } from "@/lib/types";
import { StatusIndicator } from "@/components/shared/status-indicator";
import { ModelBadge } from "@/components/shared/model-badge";

const roleIcons: Record<string, string> = {
  ceo: "👑",
  manager: "📋",
  worker: "⚙️",
};

function AgentFlowNodeInner({ data }: NodeProps) {
  const agent = data.agent as Agent;
  const isActive = agent.status === "active" || agent.status === "busy";

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-primary/60 !w-2 !h-1 !rounded-sm !border-0" />
      <div
        className={cn(
          "px-3 py-2 rounded-lg border bg-card/90 backdrop-blur-sm min-w-[140px] transition-all duration-300",
          isActive
            ? "border-primary/40 animate-pulse-glow"
            : agent.status === "error"
              ? "border-red-500/40"
              : agent.status === "terminated"
                ? "border-zinc-700/40 opacity-50"
                : "border-border/60"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">{roleIcons[agent.role] ?? "⚙️"}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold truncate">
                {agent.displayName}
              </span>
              <StatusIndicator status={agent.status} size="sm" />
            </div>
            <ModelBadge
              provider={agent.model.provider}
              model={agent.model.displayName}
              className="mt-0.5"
            />
          </div>
        </div>
        {agent.currentTask && (
          <p className="text-[9px] text-muted-foreground truncate mt-1.5 max-w-[160px]">
            {agent.currentTask}
          </p>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary/60 !w-2 !h-1 !rounded-sm !border-0" />
    </>
  );
}

export const AgentFlowNode = memo(AgentFlowNodeInner);
