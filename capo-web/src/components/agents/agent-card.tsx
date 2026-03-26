"use client";

import Link from "next/link";
import { Eye, GitFork, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModelBadge } from "@/components/shared/model-badge";
import type { AgentTemplate } from "@/lib/mock";

const roleIcons: Record<string, string> = {
  ceo: "👑",
  manager: "📋",
  worker: "⚙️",
};

export function AgentCard({ template }: { template: AgentTemplate }) {
  return (
    <div className="group rounded-lg border border-border/40 bg-card/30 p-4 hover:border-primary/30 hover:bg-card/50 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg shrink-0">
          {roleIcons[template.role] ?? "⚙️"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold truncate">{template.name}</h3>
            <Badge variant="secondary" className="text-[9px] h-4 px-1 capitalize">
              {template.role}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
            {template.description}
          </p>
          <div className="mt-2">
            <ModelBadge provider={template.defaultModel.includes("claude") ? "anthropic" : template.defaultModel.includes("gpt") ? "openai" : "google"} model={template.defaultModel} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/30">
        <Button size="sm" className="h-6 text-[10px] flex-1 gap-1">
          <Plus className="size-2.5" />
          Use
        </Button>
        <Link
          href={`/agents/${template.id}`}
          className="inline-flex shrink-0 items-center justify-center rounded-[min(var(--radius-md),12px)] h-6 gap-1 px-2.5 text-[10px] font-medium transition-all hover:bg-muted hover:text-foreground"
        >
          <Eye className="size-2.5" />
          Preview
        </Link>
        <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1">
          <GitFork className="size-2.5" />
          Fork
        </Button>
      </div>
    </div>
  );
}
