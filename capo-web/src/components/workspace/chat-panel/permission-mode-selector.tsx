"use client";

import { Shield, ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore, type PermissionMode } from "@/lib/stores/chat-store";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

const modeConfig: Record<
  PermissionMode,
  {
    icon: React.ReactNode;
    label: string;
    description: string;
    color: string;
    bgColor: string;
  }
> = {
  auto: {
    icon: <ShieldCheck className="size-3" />,
    label: "Auto",
    description: "Tools execute automatically without asking",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  ask: {
    icon: <ShieldAlert className="size-3" />,
    label: "Ask",
    description: "Agents ask for permission before tool execution",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  deny: {
    icon: <ShieldOff className="size-3" />,
    label: "Deny",
    description: "All tool execution is blocked",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
};

const modeOrder: PermissionMode[] = ["auto", "ask", "deny"];

export function PermissionModeSelector() {
  const permissionMode = useChatStore((s) => s.permissionMode);
  const setPermissionMode = useChatStore((s) => s.setPermissionMode);

  const config = modeConfig[permissionMode];

  const cycleMode = () => {
    const currentIndex = modeOrder.indexOf(permissionMode);
    const nextIndex = (currentIndex + 1) % modeOrder.length;
    setPermissionMode(modeOrder[nextIndex]);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={cycleMode}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium",
            "border border-border/30 hover:border-border/50",
            "transition-colors cursor-pointer select-none",
            config.bgColor,
            config.color
          )}
        >
          {config.icon}
          <span>{config.label}</span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs max-w-[200px]">
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Permission: {config.label}</span>
            <span className="text-[10px] opacity-80">{config.description}</span>
            <span className="text-[10px] opacity-60">Click to cycle modes</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
