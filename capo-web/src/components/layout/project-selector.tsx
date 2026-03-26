"use client";

import { ChevronDown, Plus, Circle } from "lucide-react";
import { useProject } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/lib/types";

const statusColor: Record<ProjectStatus, string> = {
  active: "text-capo-emerald",
  paused: "text-capo-amber",
  completed: "text-primary",
  archived: "text-muted-foreground",
};

export function ProjectSelector() {
  const { projects, activeProject, setActiveProject } = useProject();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/60 bg-card/50 hover:bg-accent/50 transition-colors text-sm max-w-70" />}
      >
        {activeProject && (
          <Circle
            className={`size-2 fill-current ${statusColor[activeProject.status]}`}
          />
        )}
        <span className="truncate font-medium text-xs">
          {activeProject?.name ?? "Select Project"}
        </span>
        <ChevronDown className="size-3 text-muted-foreground shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[260px]">
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => setActiveProject(project.id)}
            className="flex items-center gap-2 text-xs"
          >
            <Circle
              className={`size-2 fill-current shrink-0 ${statusColor[project.status]}`}
            />
            <span className="truncate flex-1">{project.name}</span>
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
              {project.status}
            </Badge>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 text-xs text-muted-foreground">
          <Plus className="size-3" />
          New Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
