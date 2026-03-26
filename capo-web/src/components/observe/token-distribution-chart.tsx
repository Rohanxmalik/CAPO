"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { tokenDistribution } from "@/lib/mock";
import { formatTokens } from "@/lib/utils/format-tokens";

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

export function TokenDistributionChart() {
  return (
    <div className="rounded-lg border border-border/40 bg-card/30 p-4">
      <h3 className="text-xs font-semibold mb-4">Token Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={tokenDistribution}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            dataKey="tokensUsed"
            nameKey="agentName"
            paddingAngle={2}
          >
            {tokenDistribution.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.14 0.015 270)",
              border: "1px solid oklch(0.22 0.02 270)",
              borderRadius: "6px",
              fontSize: 11,
            }}
            formatter={(value) => [formatTokens(Number(value)), "Tokens"]}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        {tokenDistribution.map((item, i) => (
          <div key={item.agentId} className="flex items-center gap-1">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-[10px] text-muted-foreground">{item.agentName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
