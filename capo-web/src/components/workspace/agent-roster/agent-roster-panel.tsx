"use client";

import { Users, Plus, Wand2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AgentTree } from "./agent-tree";
import { useAgents } from "@/lib/hooks";

export function AgentRosterPanel() {
  const { tree } = useAgents();

  return (
    <div className="flex flex-col h-full border-r border-border/40 bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
        <div className="flex items-center gap-1.5">
          <Users className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold">Agent Roster</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="size-6">
            <Wand2 className="size-3" />
          </Button>
          <Button variant="ghost" size="icon" className="size-6">
            <Plus className="size-3" />
          </Button>
        </div>
      </div>

      {/* Agent Tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {tree.map((node) => (
            <AgentTree key={node.agent.id} node={node} depth={0} />
          ))}
        </div>
      </ScrollArea>

      {/* Footer Controls */}
      <div className="px-3 py-2 border-t border-border/40">
        <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground h-7">
          <Wand2 className="size-3 mr-1.5" />
          Auto-assign
        </Button>
      </div>
    </div>
  );
}
