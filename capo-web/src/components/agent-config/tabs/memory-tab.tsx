"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Agent } from "@/lib/types";

const layers = [
  { key: "working", label: "Working Memory", desc: "Active context, cleared after task" },
  { key: "episodic", label: "Episodic Memory", desc: "Past interactions and decisions" },
  { key: "semantic", label: "Semantic Memory", desc: "Domain knowledge and facts" },
  { key: "procedural", label: "Procedural Memory", desc: "Learned patterns and SOPs" },
] as const;

export function MemoryTab({ agent }: { agent: Agent }) {
  return (
    <div className="space-y-3">
      {layers.map((layer) => {
        const val = agent.memory[layer.key];
        const isEnabled = val === true || val === "read-only";
        const isReadOnly = val === "read-only";

        return (
          <div
            key={layer.key}
            className="flex items-start justify-between rounded-md border border-border/40 bg-card/30 p-3"
          >
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">{layer.label}</Label>
              <p className="text-[10px] text-muted-foreground">{layer.desc}</p>
              {isReadOnly && (
                <span className="text-[9px] text-capo-amber">Read-only</span>
              )}
            </div>
            <Switch defaultChecked={isEnabled} className="scale-75" />
          </div>
        );
      })}

      <div className="space-y-2 pt-2">
        <Label className="text-xs">Retention Policy</Label>
        <Select defaultValue="session">
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="task" className="text-xs">Per Task</SelectItem>
            <SelectItem value="session" className="text-xs">Per Session</SelectItem>
            <SelectItem value="persistent" className="text-xs">Persistent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
