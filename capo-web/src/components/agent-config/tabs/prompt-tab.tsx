"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Agent } from "@/lib/types";

export function PromptTab({ agent }: { agent: Agent }) {
  return (
    <div className="space-y-3">
      <Label className="text-xs">System Prompt</Label>
      <Textarea
        defaultValue={agent.systemPrompt}
        className="min-h-[300px] text-xs font-mono resize-none bg-card/50"
        placeholder="Enter the agent's system prompt..."
      />
      <p className="text-[10px] text-muted-foreground">
        Supports markdown. Use {"{{task}}"} and {"{{context}}"} for variable interpolation.
      </p>
    </div>
  );
}
