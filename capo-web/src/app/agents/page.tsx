"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentSidebar } from "@/components/agents/agent-sidebar";
import { AgentCardGrid } from "@/components/agents/agent-card-grid";
import { agentTemplates } from "@/lib/mock";

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = agentTemplates.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || t.role === category || t.type === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-1 overflow-hidden">
      <AgentSidebar selected={category} onSelect={setCategory} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/40">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold">Agents</h1>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agents..."
                className="h-7 pl-7 w-[200px] text-xs"
              />
            </div>
          </div>
          <Button size="sm" className="h-7 text-xs gap-1">
            <Plus className="size-3" />
            Create New
          </Button>
        </div>

        {/* Grid */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <AgentCardGrid templates={filtered} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
