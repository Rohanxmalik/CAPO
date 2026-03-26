"use client";

import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Agent } from "@/lib/types";

export function ToolsTab({ agent }: { agent: Agent }) {
  const grouped = agent.tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, typeof agent.tools>
  );

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([category, tools]) => (
        <div key={category}>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">
            {category}
          </p>
          <div className="space-y-2">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between rounded-md border border-border/40 bg-card/30 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={tool.permission !== "deny"} className="scale-75" />
                  <span className="text-xs">{tool.name}</span>
                </div>
                <Select defaultValue={tool.permission}>
                  <SelectTrigger className="h-6 w-16 text-[10px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto" className="text-[10px]">Auto</SelectItem>
                    <SelectItem value="ask" className="text-[10px]">Ask</SelectItem>
                    <SelectItem value="deny" className="text-[10px]">Deny</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
