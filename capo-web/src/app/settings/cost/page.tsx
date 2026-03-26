"use client";

import { useState } from "react";
import { DollarSign, Wallet, Calculator, Users } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/shared/metric-card";
import { agentMetricsBreakdown, dailyCosts, tokenDistribution } from "@/lib/mock";
import { useProject } from "@/lib/hooks";
import { formatCost } from "@/lib/utils/format-cost";
import { formatTokens } from "@/lib/utils/format-tokens";
import { cn } from "@/lib/utils";

const COLORS = [
  "oklch(0.65 0.2 260)",
  "oklch(0.7 0.18 160)",
  "oklch(0.78 0.16 85)",
  "oklch(0.6 0.22 25)",
  "oklch(0.65 0.2 300)",
  "oklch(0.55 0.15 200)",
  "oklch(0.6 0.1 130)",
  "oklch(0.7 0.12 50)",
];

export default function CostBreakdownPage() {
  const { activeProject } = useProject();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "today" | "7days" | "30days" | "alltime"
  >("30days");

  // Calculate cost metrics
  const totalSpend = agentMetricsBreakdown.reduce(
    (sum, agent) => sum + agent.costUsd,
    0
  );
  const totalTasks = agentMetricsBreakdown.reduce(
    (sum, agent) => sum + agent.tasksCompleted,
    0
  );
  const costPerTask = totalTasks > 0 ? totalSpend / totalTasks : 0;
  const activeAgents = agentMetricsBreakdown.filter(
    (agent) => agent.status !== "terminated"
  ).length;
  const budgetRemaining = (activeProject?.budget ?? 0) - totalSpend;

  // Sort agents by cost descending
  const sortedAgents = [...agentMetricsBreakdown].sort(
    (a, b) => b.costUsd - a.costUsd
  );

  const periods = [
    { label: "Today", value: "today" as const },
    { label: "7 Days", value: "7days" as const },
    { label: "30 Days", value: "30days" as const },
    { label: "All Time", value: "alltime" as const },
  ];

  return (
    <div className="space-y-6">
      {/* Cost Summary Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={DollarSign}
          label="Total Spend"
          value={formatCost(totalSpend)}
          trend={undefined}
        />
        <MetricCard
          icon={Wallet}
          label="Budget Remaining"
          value={formatCost(budgetRemaining)}
          trend={undefined}
        />
        <MetricCard
          icon={Calculator}
          label="Cost per Task"
          value={formatCost(costPerTask)}
          trend={undefined}
        />
        <MetricCard
          icon={Users}
          label="Active Agents"
          value={activeAgents.toString()}
          trend={undefined}
        />
      </div>

      {/* Period Selector */}
      <div className="rounded-lg border border-border/40 bg-card/30 p-4">
        <div className="text-xs font-semibold mb-3">Period</div>
        <div className="flex gap-2">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
              className="text-xs"
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cost Over Time Chart */}
        <div className="rounded-lg border border-border/40 bg-card/30 p-4">
          <div className="text-xs font-semibold mb-4">Cost Over Time</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dailyCosts}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 270)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                stroke="oklch(0.4 0.01 270)"
              />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke="oklch(0.4 0.01 270)"
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0.015 270)",
                  border: "1px solid oklch(0.22 0.02 270)",
                  borderRadius: "6px",
                  fontSize: 11,
                }}
                labelStyle={{ color: "oklch(0.85 0.02 270)" }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Cost"]}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="oklch(0.65 0.2 260)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.65 0.2 260)", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Token Distribution Donut */}
        <div className="rounded-lg border border-border/40 bg-card/30 p-4">
          <div className="text-xs font-semibold mb-4">Token Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={tokenDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="tokensUsed"
                nameKey="agentName"
              >
                {tokenDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0.015 270)",
                  border: "1px solid oklch(0.22 0.02 270)",
                  borderRadius: "6px",
                }}
                labelStyle={{ color: "oklch(0.85 0.02 270)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Cost Table */}
      <div className="rounded-lg border border-border/40 bg-card/30 p-4 overflow-x-auto">
        <div className="text-xs font-semibold mb-4">Agent Cost Breakdown</div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/40">
              <TableHead className="text-[10px] font-semibold text-muted-foreground">
                Agent Name
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground">
                Type
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground text-right">
                Tasks
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground text-right">
                Tokens
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground text-right">
                Cost
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-muted-foreground text-right">
                Success Rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAgents.map((agent) => (
              <TableRow key={agent.agentId} className="border-border/40">
                <TableCell className="text-xs py-2">{agent.agentName}</TableCell>
                <TableCell className="text-xs py-2">{agent.type}</TableCell>
                <TableCell className="text-xs py-2 text-right">
                  {agent.tasksCompleted}
                </TableCell>
                <TableCell className="text-xs py-2 text-right">
                  {formatTokens(agent.tokensUsed)}
                </TableCell>
                <TableCell className="text-xs py-2 text-right font-mono text-capo-emerald">
                  {formatCost(agent.costUsd)}
                </TableCell>
                <TableCell className="text-xs py-2 text-right">
                  {agent.successRate}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
