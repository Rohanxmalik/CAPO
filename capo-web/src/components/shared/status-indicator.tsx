"use client";

import { cn } from "@/lib/utils";
import type { AgentStatus } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { statusLabels } from "@/lib/utils/colors";

const statusClasses: Record<AgentStatus, string> = {
  active: "bg-emerald-500 shadow-emerald-500/50",
  idle: "bg-yellow-500 shadow-yellow-500/50",
  busy: "bg-blue-500 shadow-blue-500/50 animate-pulse",
  error: "bg-red-500 shadow-red-500/50 animate-pulse",
  terminated: "bg-zinc-500",
};

export function StatusIndicator({
  status,
  size = "sm",
}: {
  status: AgentStatus;
  size?: "sm" | "md";
}) {
  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex items-center p-0 leading-none border-none bg-transparent cursor-default">
        <span
          className={cn(
            "inline-block rounded-full shadow-[0_0_6px]",
            size === "sm" ? "size-2" : "size-2.5",
            statusClasses[status]
          )}
        />
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs">
        {statusLabels[status]}
      </TooltipContent>
    </Tooltip>
  );
}
