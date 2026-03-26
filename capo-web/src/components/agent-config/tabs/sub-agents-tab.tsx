"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/shared/status-indicator";
import { ModelBadge } from "@/components/shared/model-badge";
import { BudgetBar } from "@/components/shared/budget-bar";
import { useAgentStore } from "@/lib/stores";
import { Plus, ArrowUpRight, X } from "lucide-react";
import type { Agent } from "@/lib/types";

export function SubAgentsTab({ agent }: { agent: Agent }) {
  const agents = useAgentStore((s) => s.agents);
  const children = agents.filter((a) => a.parentId === agent.id);
  const parent = agents.find((a) => a.id === agent.parentId);
  const unassigned = agents.filter(
    (a) => a.id !== agent.id && a.parentId !== agent.id && a.role === "worker"
  );

  return (
    <div className="space-y-4">
      {/* Reports To */}
      {parent && (
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">
            Reports To
          </p>
          <div className="flex items-center gap-2 rounded-md border border-border/40 bg-card/30 px-3 py-2">
            <StatusIndicator status={parent.status} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium">{parent.displayName}</span>
                <Badge variant="outline" className="text-[9px] h-4 px-1 capitalize">
                  {parent.role}
                </Badge>
              </div>
            </div>
            <ArrowUpRight className="size-3 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Direct Reports */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase">
            Direct Reports ({children.length})
          </p>
          <Button variant="ghost" size="icon" className="size-5">
            <Plus className="size-3" />
          </Button>
        </div>

        {children.length === 0 ? (
          <p className="text-[10px] text-muted-foreground italic py-4 text-center">
            No subordinates assigned
          </p>
        ) : (
          <div className="space-y-1.5">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center gap-2 rounded-md border border-border/40 bg-card/30 px-3 py-2"
              >
                <StatusIndicator status={child.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium truncate">{child.displayName}</span>
                    <ModelBadge
                      provider={child.model.provider}
                      model={child.model.displayName}
                    />
                  </div>
                  {child.currentTask && (
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {child.currentTask}
                    </p>
                  )}
                  <BudgetBar percent={child.budgetUsedPercent} className="mt-1" />
                </div>
                <Button variant="ghost" size="icon" className="size-5 shrink-0">
                  <X className="size-3 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delegation Rules */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">
          Delegation Rules
        </p>
        <div className="space-y-2 text-[10px]">
          <div className="flex items-center justify-between rounded-md border border-border/40 bg-card/30 px-3 py-2">
            <span>Auto-delegate matching tasks</span>
            <Badge variant="secondary" className="text-[9px] h-4 px-1.5">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border/40 bg-card/30 px-3 py-2">
            <span>Max sub-agents allowed</span>
            <Badge variant="outline" className="text-[9px] h-4 px-1.5">8</Badge>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border/40 bg-card/30 px-3 py-2">
            <span>Spawn gate threshold</span>
            <Badge variant="outline" className="text-[9px] h-4 px-1.5">&gt;3 requires approval</Badge>
          </div>
        </div>
      </div>

      {/* Available for Assignment */}
      {unassigned.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">
            Available Workers
          </p>
          <div className="space-y-1.5">
            {unassigned.slice(0, 5).map((worker) => (
              <div
                key={worker.id}
                className="flex items-center gap-2 rounded-md border border-dashed border-border/40 bg-card/20 px-3 py-2"
              >
                <StatusIndicator status={worker.status} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs truncate">{worker.displayName}</span>
                </div>
                <Button variant="ghost" size="icon" className="size-5">
                  <Plus className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
