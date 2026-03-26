"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dailyCosts } from "@/lib/mock";

export function CostForecastChart() {
  return (
    <div className="rounded-lg border border-border/40 bg-card/30 p-4">
      <h3 className="text-xs font-semibold mb-4">Cost Over Time</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={dailyCosts}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 270)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "oklch(0.55 0.02 260)" }}
            stroke="oklch(0.22 0.02 270)"
          />
          <YAxis
            tick={{ fontSize: 10, fill: "oklch(0.55 0.02 260)" }}
            stroke="oklch(0.22 0.02 270)"
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.14 0.015 270)",
              border: "1px solid oklch(0.22 0.02 270)",
              borderRadius: "6px",
              fontSize: 11,
            }}
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
  );
}
