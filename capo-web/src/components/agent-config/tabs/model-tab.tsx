"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import type { Agent } from "@/lib/types";

const models = [
  { provider: "anthropic", models: ["Claude Opus 4", "Claude Sonnet 4", "Claude Haiku 4"] },
  { provider: "openai", models: ["GPT-4o", "GPT-4o-mini", "o3"] },
  { provider: "groq", models: ["Llama 4 Scout", "Llama 4 Maverick"] },
];

export function ModelTab({ agent }: { agent: Agent }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-xs">Model</Label>
        <Select defaultValue={agent.model.displayName}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {models.map((group) => (
              <div key={group.provider}>
                <p className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase">
                  {group.provider}
                </p>
                {group.models.map((m) => (
                  <SelectItem key={m} value={m} className="text-xs">
                    {m}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Fallback Model</Label>
        <Select defaultValue={agent.model.fallbackModel ?? ""}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="text-xs">None</SelectItem>
            {models.flatMap((g) =>
              g.models.map((m) => (
                <SelectItem key={m} value={m} className="text-xs">{m}</SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Temperature</Label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {agent.model.temperature ?? 0.5}
          </span>
        </div>
        <Slider
          defaultValue={[agent.model.temperature ?? 0.5]}
          max={1}
          step={0.1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Max Tokens</Label>
        <Input
          type="number"
          defaultValue={agent.model.maxTokens ?? 4096}
          className="h-8 text-xs"
        />
      </div>
    </div>
  );
}
