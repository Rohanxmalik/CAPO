"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelBadge } from "@/components/shared/model-badge";
import { agentTemplates } from "@/lib/mock";

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = use(params);
  const template = agentTemplates.find((t) => t.id === agentId);

  if (!template) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Agent not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Header */}
      <div className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href="/agents"
            className="inline-flex shrink-0 items-center justify-center rounded-lg size-7 transition-all hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
          </Link>
          <h1 className="text-lg font-semibold">{template.name}</h1>
          <Badge variant="secondary" className="text-[10px] capitalize">
            {template.role}
          </Badge>
          <ModelBadge provider={template.defaultModel.includes("claude") ? "anthropic" : template.defaultModel.includes("gpt") ? "openai" : "google"} model={template.defaultModel} />
        </div>
        <p className="text-sm text-muted-foreground ml-10">{template.description}</p>
        <div className="flex gap-2 mt-3 ml-10">
          <Button size="sm" className="h-7 text-xs">Use in Project</Button>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
            <Edit className="size-3" /> Edit
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
            <Copy className="size-3" /> Duplicate
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="prompt">
          <TabsList>
            <TabsTrigger value="prompt" className="text-xs">System Prompt</TabsTrigger>
            <TabsTrigger value="config" className="text-xs">Configuration</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="mt-4">
            <div className="rounded-lg border border-border/40 bg-card/30 p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed max-w-3xl">
              {template.description}
            </div>
          </TabsContent>

          <TabsContent value="config" className="mt-4">
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="rounded-lg border border-border/40 bg-card/30 p-3">
                <p className="text-[10px] text-muted-foreground mb-1">Model</p>
                <p className="text-xs font-medium">{template.defaultModel}</p>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/30 p-3">
                <p className="text-[10px] text-muted-foreground mb-1">Category</p>
                <p className="text-xs font-medium capitalize">{template.category}</p>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/30 p-3">
                <p className="text-[10px] text-muted-foreground mb-1">Role</p>
                <p className="text-xs font-medium capitalize">{template.role}</p>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/30 p-3">
                <p className="text-[10px] text-muted-foreground mb-1">Type</p>
                <p className="text-xs font-medium capitalize">{template.type}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Performance metrics will appear after this agent has completed tasks.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
