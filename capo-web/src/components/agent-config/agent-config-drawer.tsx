"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWorkspaceStore, useAgentStore } from "@/lib/stores";
import { StatusIndicator } from "@/components/shared/status-indicator";
import { ModelTab } from "./tabs/model-tab";
import { PromptTab } from "./tabs/prompt-tab";
import { ToolsTab } from "./tabs/tools-tab";
import { MemoryTab } from "./tabs/memory-tab";
import { BudgetTab } from "./tabs/budget-tab";
import { ConstraintsTab } from "./tabs/constraints-tab";
import { SkillsTab } from "./tabs/skills-tab";
import { SubAgentsTab } from "./tabs/sub-agents-tab";

const tabs = [
  { value: "model", label: "Model" },
  { value: "prompt", label: "Prompt" },
  { value: "tools", label: "Tools" },
  { value: "skills", label: "Skills" },
  { value: "memory", label: "Memory" },
  { value: "budget", label: "Budget" },
  { value: "sub-agents", label: "Team" },
  { value: "constraints", label: "Rules" },
] as const;

export function AgentConfigDrawer() {
  const isOpen = useWorkspaceStore((s) => s.isConfigDrawerOpen);
  const agentId = useWorkspaceStore((s) => s.configDrawerAgentId);
  const close = useWorkspaceStore((s) => s.closeConfigDrawer);
  const agent = useAgentStore((s) =>
    s.agents.find((a) => a.id === agentId)
  );

  if (!agent) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent className="w-[420px] sm:w-[480px] p-0 bg-sidebar border-border/40">
        <SheetHeader className="px-4 py-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <StatusIndicator status={agent.status} />
            <SheetTitle className="text-sm font-semibold">
              {agent.displayName}
            </SheetTitle>
            <span className="text-[10px] text-muted-foreground capitalize">
              {agent.role}
            </span>
          </div>
        </SheetHeader>

        <Tabs defaultValue="model" className="flex flex-col h-[calc(100%-52px)]">
          <TabsList className="mx-4 mt-3 bg-muted/30 h-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-[10px] px-2 h-6"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="model" className="mt-0">
              <ModelTab agent={agent} />
            </TabsContent>
            <TabsContent value="prompt" className="mt-0">
              <PromptTab agent={agent} />
            </TabsContent>
            <TabsContent value="tools" className="mt-0">
              <ToolsTab agent={agent} />
            </TabsContent>
            <TabsContent value="skills" className="mt-0">
              <SkillsTab agent={agent} />
            </TabsContent>
            <TabsContent value="memory" className="mt-0">
              <MemoryTab agent={agent} />
            </TabsContent>
            <TabsContent value="budget" className="mt-0">
              <BudgetTab agent={agent} />
            </TabsContent>
            <TabsContent value="sub-agents" className="mt-0">
              <SubAgentsTab agent={agent} />
            </TabsContent>
            <TabsContent value="constraints" className="mt-0">
              <ConstraintsTab agent={agent} />
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
