"use client";

import { useState } from "react";
import {
  Wrench,
  ChevronDown,
  Code,
  Globe,
  GitPullRequest,
  Search,
  Database,
  MessageSquare,
  Puzzle,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore, type McpTool } from "@/lib/stores/chat-store";

const categoryConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  code: {
    icon: <Code className="size-3" />,
    label: "Code",
    color: "text-blue-400",
  },
  browser: {
    icon: <Globe className="size-3" />,
    label: "Browser",
    color: "text-purple-400",
  },
  github: {
    icon: <GitPullRequest className="size-3" />,
    label: "GitHub",
    color: "text-gray-400",
  },
  search: {
    icon: <Search className="size-3" />,
    label: "Search",
    color: "text-green-400",
  },
  data: {
    icon: <Database className="size-3" />,
    label: "Data",
    color: "text-amber-400",
  },
  communication: {
    icon: <MessageSquare className="size-3" />,
    label: "Communication",
    color: "text-pink-400",
  },
  custom: {
    icon: <Puzzle className="size-3" />,
    label: "Custom",
    color: "text-cyan-400",
  },
};

const categoryOrder = [
  "code",
  "browser",
  "github",
  "search",
  "data",
  "communication",
  "custom",
];

export function McpToolsMenu() {
  const [open, setOpen] = useState(false);
  const tools = useChatStore((s) => s.tools);
  const toggleTool = useChatStore((s) => s.toggleTool);

  const enabledCount = tools.filter((t) => t.enabled).length;

  const grouped = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, McpTool[]>
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium",
          "bg-card/60 border border-border/30 hover:bg-card hover:border-border/50",
          "transition-colors cursor-pointer select-none",
          open && "bg-card border-border/50"
        )}
      >
        <Wrench className="size-3 text-muted-foreground" />
        <span className="text-foreground/90">Tools</span>
        <span className="text-[9px] text-muted-foreground bg-muted/50 px-1 rounded">
          {enabledCount}
        </span>
        <ChevronDown
          className={cn(
            "size-2.5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-full left-0 mb-1.5 z-50 w-70 rounded-lg border border-border/40 bg-popover shadow-xl animate-in fade-in-0 slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between p-1.5 border-b border-border/30">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1.5">
                MCP Tools
              </span>
              <span className="text-[10px] text-muted-foreground px-1.5">
                {enabledCount}/{tools.length} active
              </span>
            </div>
            <div className="p-1 max-h-80 overflow-y-auto">
              {categoryOrder.map((cat) => {
                const catTools = grouped[cat];
                if (!catTools) return null;
                const config = categoryConfig[cat];
                const enabledInCat = catTools.filter((t) => t.enabled).length;

                return (
                  <div key={cat} className="mb-1">
                    <div className="flex items-center gap-1.5 px-2 py-1">
                      <span className={config.color}>{config.icon}</span>
                      <span className="text-[10px] font-semibold text-muted-foreground flex-1">
                        {config.label}
                      </span>
                      <span className="text-[9px] text-muted-foreground/60">
                        {enabledInCat}/{catTools.length}
                      </span>
                    </div>
                    {catTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => toggleTool(tool.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1 rounded-md text-xs",
                          "hover:bg-accent/50 transition-colors cursor-pointer",
                          tool.enabled
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        )}
                      >
                        <div
                          className={cn(
                            "size-3.5 rounded border flex items-center justify-center transition-colors",
                            tool.enabled
                              ? "bg-primary border-primary"
                              : "border-border/60 bg-transparent"
                          )}
                        >
                          {tool.enabled && (
                            <Check className="size-2.5 text-primary-foreground" />
                          )}
                        </div>
                        <span className="flex-1 text-left font-medium text-[11px]">
                          {tool.name}
                        </span>
                        <span className="text-[9px] text-muted-foreground/50">
                          {tool.description}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
