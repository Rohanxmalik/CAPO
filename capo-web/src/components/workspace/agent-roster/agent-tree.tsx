"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgentStore } from "@/lib/stores";
import { useWorkspaceStore } from "@/lib/stores";
import { StatusIndicator } from "@/components/shared/status-indicator";
import { ModelBadge } from "@/components/shared/model-badge";
import { BudgetBar } from "@/components/shared/budget-bar";
import type { AgentTreeNode } from "@/lib/utils/agent-hierarchy";

export function AgentTree({
  node,
  depth,
}: {
  node: AgentTreeNode;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const setSelectedAgent = useAgentStore((s) => s.setSelectedAgent);
  const openConfigDrawer = useWorkspaceStore((s) => s.openConfigDrawer);
  const { agent } = node;
  const hasChildren = node.children.length > 0;
  const isSelected = selectedAgentId === agent.id;

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setSelectedAgent(agent.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedAgent(agent.id);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          openConfigDrawer(agent.id);
        }}
        className={cn(
          "w-full flex items-start gap-2 px-2 py-1.5 rounded-md text-left transition-colors group cursor-pointer",
          isSelected
            ? "bg-primary/10 border border-primary/20"
            : "hover:bg-accent/50 border border-transparent"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {/* Expand toggle */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="mt-0.5 shrink-0"
          >
            <ChevronRight
              className={cn(
                "size-3 text-muted-foreground transition-transform",
                expanded && "rotate-90"
              )}
            />
          </button>
        ) : (
          <span className="size-3 shrink-0" />
        )}

        {/* Status */}
        <div className="mt-1 shrink-0">
          <StatusIndicator status={agent.status} />
        </div>

        {/* Agent info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium truncate">{agent.displayName}</span>
            <ModelBadge
              provider={agent.model.provider}
              model={agent.model.displayName}
            />
          </div>
          {agent.currentTask && (
            <p className="text-[10px] text-muted-foreground truncate mt-0.5">
              {agent.currentTask}
            </p>
          )}
          <BudgetBar percent={agent.budgetUsedPercent} className="mt-1" />
        </div>
      </div>

      {/* Children */}
      {expanded &&
        hasChildren &&
        node.children.map((child) => (
          <AgentTree key={child.agent.id} node={child} depth={depth + 1} />
        ))}
    </div>
  );
}
