"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusIndicator } from "@/components/shared/status-indicator";
import { ModelBadge } from "@/components/shared/model-badge";
import { formatTokens } from "@/lib/utils/format-tokens";
import { formatCost } from "@/lib/utils/format-cost";
import { useAgents } from "@/lib/hooks";

export function AgentBreakdownTable() {
  const { agents } = useAgents();

  return (
    <div className="rounded-lg border border-border/40 bg-card/30 overflow-hidden">
      <div className="px-4 py-2 border-b border-border/40">
        <h3 className="text-xs font-semibold">Agent Breakdown</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-[10px] h-8">Agent</TableHead>
            <TableHead className="text-[10px] h-8">Model</TableHead>
            <TableHead className="text-[10px] h-8 text-right">Tasks</TableHead>
            <TableHead className="text-[10px] h-8 text-right">Tokens</TableHead>
            <TableHead className="text-[10px] h-8 text-right">Cost</TableHead>
            <TableHead className="text-[10px] h-8 text-right">Success</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents
            .filter((a) => a.status !== "terminated")
            .map((agent) => (
              <TableRow key={agent.id} className="group cursor-pointer">
                <TableCell className="text-xs py-2">
                  <div className="flex items-center gap-2">
                    <StatusIndicator status={agent.status} />
                    <span>{agent.displayName}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <ModelBadge
                    provider={agent.model.provider}
                    model={agent.model.displayName}
                  />
                </TableCell>
                <TableCell className="text-xs text-right py-2">
                  {agent.metrics.tasksCompleted}
                </TableCell>
                <TableCell className="text-xs text-right py-2 font-mono">
                  {formatTokens(agent.metrics.tokensUsed)}
                </TableCell>
                <TableCell className="text-xs text-right py-2 font-mono text-capo-emerald">
                  {formatCost(agent.metrics.costUsd)}
                </TableCell>
                <TableCell className="text-xs text-right py-2">
                  {agent.metrics.successRate}%
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
