"use client";

import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/stores/chat-store";
import { ModelSelector } from "./model-selector";
import { PermissionModeSelector } from "./permission-mode-selector";
import { McpToolsMenu } from "./mcp-tools-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function ChatToolbar() {
  const isThinkingEnabled = useChatStore((s) => s.isThinkingEnabled);
  const setThinkingEnabled = useChatStore((s) => s.setThinkingEnabled);

  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 flex-wrap">
      <ModelSelector />

      <div className="h-3 w-px bg-border/30" />

      <PermissionModeSelector />

      <div className="h-3 w-px bg-border/30" />

      <McpToolsMenu />

      <div className="h-3 w-px bg-border/30" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={() => setThinkingEnabled(!isThinkingEnabled)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium",
              "border border-border/30 hover:border-border/50",
              "transition-colors cursor-pointer select-none",
              isThinkingEnabled
                ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                : "bg-card/60 text-muted-foreground"
            )}
          >
            <Brain className="size-3" />
            <span>Think</span>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            {isThinkingEnabled
              ? "Extended thinking enabled — click to disable"
              : "Extended thinking disabled — click to enable"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex-1" />

      <span className="text-[9px] text-muted-foreground/40 font-mono select-none">
        / for commands
      </span>
    </div>
  );
}
