"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProject } from "@/lib/hooks";
import { formatCost } from "@/lib/utils/format-cost";
import { ProjectSelector } from "./project-selector";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navTabs = [
  { label: "Workspace", href: "/workspace" },
  { label: "Agents", href: "/agents" },
  { label: "Observe", href: "/observe" },
  { label: "Build", href: "/build" },
] as const;

export function GlobalNavbar() {
  const pathname = usePathname();
  const { activeProject } = useProject();
  const todaySpend = activeProject ? activeProject.spent : 0;

  return (
    <header className="sticky top-0 z-50 h-12 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-full items-center px-3 gap-2">
        {/* Left: Logo + Settings */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <Link href="/workspace" className="flex items-center gap-1.5 group">
            <div className="size-6 rounded-md bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Zap className="size-3.5 text-primary" />
            </div>
            <span className="font-semibold text-sm tracking-tight">CAPO</span>
          </Link>

          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  href="/settings/cost"
                  className="inline-flex items-center h-7 gap-1.5 px-2.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                />
              }
            >
              <Settings className="size-3.5" />
              <span className="text-capo-emerald font-medium">
                {formatCost(todaySpend)}
              </span>
            </TooltipTrigger>
            <TooltipContent>Project Settings</TooltipContent>
          </Tooltip>
        </div>

        {/* Center: Project Selector */}
        <div className="flex-1 flex justify-center">
          <ProjectSelector />
        </div>

        {/* Right: Nav Tabs */}
        <nav className="flex items-center gap-0.5 min-w-[200px] justify-end">
          {navTabs.map((tab) => {
            const isActive =
              pathname === tab.href || pathname.startsWith(tab.href + "/");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
