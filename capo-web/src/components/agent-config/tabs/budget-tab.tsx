"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { BudgetBar } from "@/components/shared/budget-bar";
import { formatCost } from "@/lib/utils/format-cost";
import { formatTokens } from "@/lib/utils/format-tokens";
import type { Agent } from "@/lib/types";

export function BudgetTab({ agent }: { agent: Agent }) {
  return (
    <div className="space-y-5">
      {/* Current usage */}
      <div className="rounded-md border border-border/40 bg-card/30 p-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Current Usage</span>
          <span className="font-medium">{agent.budgetUsedPercent.toFixed(1)}%</span>
        </div>
        <BudgetBar percent={agent.budgetUsedPercent} />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{formatCost(agent.metrics.costUsd)} spent</span>
          <span>{formatTokens(agent.metrics.tokensUsed)} tokens</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Max Cost (USD)</Label>
        <Input
          type="number"
          defaultValue={agent.budget.maxCostUsd}
          step={0.5}
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Max Tokens</Label>
        <Input
          type="number"
          defaultValue={agent.budget.maxTokens}
          step={10000}
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Auto-downgrade at</Label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {agent.budget.autoDowngradeAt ?? 90}%
          </span>
        </div>
        <Slider
          defaultValue={[agent.budget.autoDowngradeAt ?? 90]}
          min={50}
          max={100}
          step={5}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-xs">Hard Stop at 100%</Label>
          <p className="text-[10px] text-muted-foreground">Terminate on budget exhaustion</p>
        </div>
        <Switch defaultChecked className="scale-75" />
      </div>
    </div>
  );
}
