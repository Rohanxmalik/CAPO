"use client";

import { Coins, Clock, Zap, CheckCircle } from "lucide-react";
import { useAgents } from "@/lib/hooks";
import { formatCost } from "@/lib/utils/format-cost";
import { formatTokens } from "@/lib/utils/format-tokens";

export function MetricsTicker() {
  const { agents } = useAgents();

  const totalTokens = agents.reduce((s, a) => s + a.metrics.tokensUsed, 0);
  const totalCost = agents.reduce((s, a) => s + a.metrics.costUsd, 0);
  const totalTasks = agents.reduce((s, a) => s + a.metrics.tasksCompleted, 0);
  const totalFailed = agents.reduce((s, a) => s + a.metrics.tasksFailed, 0);
  const activeCount = agents.filter(
    (a) => a.status === "active" || a.status === "busy"
  ).length;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-border/40 bg-background/90 backdrop-blur-sm flex items-center justify-center gap-6 text-[11px] text-muted-foreground z-10">
      <div className="flex items-center gap-1">
        <Zap className="size-3 text-primary/60" />
        <span>{formatTokens(totalTokens)} tokens</span>
      </div>
      <div className="flex items-center gap-1">
        <Coins className="size-3 text-capo-emerald/60" />
        <span>{formatCost(totalCost)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="size-3 text-capo-amber/60" />
        <span>{activeCount} active</span>
      </div>
      <div className="flex items-center gap-1">
        <CheckCircle className="size-3 text-capo-emerald/60" />
        <span>
          {totalTasks}/{totalTasks + totalFailed} tasks
        </span>
      </div>
    </div>
  );
}
