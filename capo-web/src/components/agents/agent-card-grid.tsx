"use client";

import { AgentCard } from "./agent-card";
import type { AgentTemplate } from "@/lib/mock";

export function AgentCardGrid({ templates }: { templates: AgentTemplate[] }) {
  if (templates.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-12">
        No agents match your filters
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {templates.map((template) => (
        <AgentCard key={template.id} template={template} />
      ))}
    </div>
  );
}
