"use client";

import {
  Zap,
  DollarSign,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MetricCard } from "@/components/shared/metric-card";
import { AgentBreakdownTable } from "@/components/observe/agent-breakdown-table";
import { CostForecastChart } from "@/components/observe/cost-forecast-chart";
import { TokenDistributionChart } from "@/components/observe/token-distribution-chart";
import { TimelineGantt } from "@/components/observe/timeline-gantt";
import { useAgents } from "@/lib/hooks";
import { formatTokens } from "@/lib/utils/format-tokens";
import { formatCost } from "@/lib/utils/format-cost";

export default function ObservePage() {
  const { agents } = useAgents();

  const totalTokens = agents.reduce((s, a) => s + a.metrics.tokensUsed, 0);
  const totalCost = agents.reduce((s, a) => s + a.metrics.costUsd, 0);
  const totalTasks = agents.reduce((s, a) => s + a.metrics.tasksCompleted, 0);
  const totalFailed = agents.reduce((s, a) => s + a.metrics.tasksFailed, 0);
  const successRate =
    totalTasks + totalFailed > 0
      ? ((totalTasks / (totalTasks + totalFailed)) * 100).toFixed(1)
      : "0";
  const activeCount = agents.filter(
    (a) => a.status === "active" || a.status === "busy"
  ).length;

  return (
    <ScrollArea className="flex-1">
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        <h1 className="text-sm font-semibold">Observability</h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <MetricCard
            label="Total Tokens"
            value={formatTokens(totalTokens)}
            icon={Zap}
          />
          <MetricCard
            label="Total Cost"
            value={formatCost(totalCost)}
            icon={DollarSign}
            trend={{ value: "+12%", positive: false }}
          />
          <MetricCard
            label="Success Rate"
            value={`${successRate}%`}
            icon={CheckCircle}
            trend={{ value: "+2.1%", positive: true }}
          />
          <MetricCard
            label="Avg Latency"
            value="32s"
            icon={Clock}
          />
          <MetricCard
            label="Active Agents"
            value={String(activeCount)}
            icon={Users}
          />
        </div>

        {/* Agent Breakdown */}
        <AgentBreakdownTable />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CostForecastChart />
          <TokenDistributionChart />
        </div>

        {/* Timeline */}
        <TimelineGantt />
      </div>
    </ScrollArea>
  );
}
