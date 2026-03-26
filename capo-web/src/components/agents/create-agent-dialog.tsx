"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Upload, Eye } from "lucide-react";

const defaultDefinition = `---
name: my-custom-agent
type: worker
role: worker
model:
  provider: anthropic
  model: claude-sonnet-4-6
  temperature: 0.3
  max_tokens: 4096
budget:
  max_tokens: 100000
  max_cost_usd: 5.00
  alert_thresholds: [50, 75, 90, 95, 100]
tools:
  allowed: [Read, Write, Edit, Bash]
  denied: [GitHub.MergePR]
  approval_required: [Bash]
skills: [coding-standards]
memory:
  working: true
  episodic: true
  semantic: read-only
  procedural: false
---

# My Custom Agent

## Identity
You are a specialized agent that...

## Rules
- Always follow project coding standards
- Never hardcode secrets or API keys
- Keep files under 800 lines

## Process
1. Read the task specification
2. Write failing tests (TDD)
3. Implement minimal code to pass
4. Refactor for quality
5. Submit for review

## Deliverables
- Source code files
- Test files with >80% coverage
- Brief summary of changes`;

export function CreateAgentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [definition, setDefinition] = useState(defaultDefinition);
  const [tab, setTab] = useState<string>("editor");

  // Parse YAML frontmatter for preview
  const frontmatterMatch = definition.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch?.[1] ?? "";
  const body = definition.replace(/^---\n[\s\S]*?\n---\n?/, "");

  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  const typeMatch = frontmatter.match(/type:\s*(.+)/);
  const roleMatch = frontmatter.match(/role:\s*(.+)/);
  const modelMatch = frontmatter.match(/model:\s*(\S+)/);

  const handleExport = () => {
    const blob = new Blob([definition], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nameMatch?.[1]?.trim() ?? "agent"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".md,.yaml,.yml";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setDefinition(reader.result as string);
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-semibold">
              Create New Agent
            </DialogTitle>
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={handleImport}>
                <Upload className="size-3" /> Import
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={handleExport}>
                <Download className="size-3" /> Export
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-6 w-fit">
            <TabsTrigger value="editor" className="text-xs">
              Markdown Editor
            </TabsTrigger>
            <TabsTrigger value="form" className="text-xs">
              Quick Config
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs gap-1">
              <Eye className="size-3" /> Preview
            </TabsTrigger>
          </TabsList>

          {/* Markdown Editor */}
          <TabsContent value="editor" className="flex-1 overflow-hidden mt-0 px-6 pb-4">
            <Textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="flex-1 h-full font-mono text-xs leading-relaxed resize-none bg-card/30 border-border/40"
              spellCheck={false}
            />
          </TabsContent>

          {/* Quick Config Form */}
          <TabsContent value="form" className="flex-1 overflow-auto mt-0 px-6 pb-4">
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-1.5">
                <Label className="text-xs">Agent Name</Label>
                <Input className="h-8 text-xs" defaultValue={nameMatch?.[1]?.trim()} placeholder="my-custom-agent" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Role</Label>
                <Select defaultValue={roleMatch?.[1]?.trim() ?? "worker"}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceo" className="text-xs">CEO</SelectItem>
                    <SelectItem value="manager" className="text-xs">Manager</SelectItem>
                    <SelectItem value="worker" className="text-xs">Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Type</Label>
                <Select defaultValue={typeMatch?.[1]?.trim() ?? "coder"}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coordinator" className="text-xs">Coordinator</SelectItem>
                    <SelectItem value="coder" className="text-xs">Coder</SelectItem>
                    <SelectItem value="tester" className="text-xs">Tester</SelectItem>
                    <SelectItem value="reviewer" className="text-xs">Reviewer</SelectItem>
                    <SelectItem value="researcher" className="text-xs">Researcher</SelectItem>
                    <SelectItem value="writer" className="text-xs">Writer</SelectItem>
                    <SelectItem value="designer" className="text-xs">Designer</SelectItem>
                    <SelectItem value="analyst" className="text-xs">Analyst</SelectItem>
                    <SelectItem value="ops" className="text-xs">Ops</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Model</Label>
                <Select defaultValue="claude-sonnet-4-6">
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claude-opus-4" className="text-xs">Claude Opus 4</SelectItem>
                    <SelectItem value="claude-sonnet-4-6" className="text-xs">Claude Sonnet 4</SelectItem>
                    <SelectItem value="claude-haiku-4" className="text-xs">Claude Haiku 4</SelectItem>
                    <SelectItem value="gpt-4o" className="text-xs">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini" className="text-xs">GPT-4o Mini</SelectItem>
                    <SelectItem value="llama-4-scout" className="text-xs">Llama 4 Scout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Max Tokens</Label>
                <Input type="number" className="h-8 text-xs" defaultValue={100000} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Max Cost (USD)</Label>
                <Input type="number" step="0.01" className="h-8 text-xs" defaultValue={5.0} />
              </div>
            </div>
          </TabsContent>

          {/* Preview */}
          <TabsContent value="preview" className="flex-1 overflow-auto mt-0 px-6 pb-4">
            <div className="max-w-2xl space-y-4">
              <div className="rounded-lg border border-border/40 bg-card/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold">
                    {nameMatch?.[1]?.trim() ?? "Unnamed Agent"}
                  </span>
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {roleMatch?.[1]?.trim() ?? "worker"}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {typeMatch?.[1]?.trim() ?? "coder"}
                  </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground space-y-0.5">
                  <p>Model: {modelMatch?.[1]?.trim() ?? "not set"}</p>
                </div>
              </div>

              <div className="rounded-lg border border-border/40 bg-card/30 p-4">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">
                  System Prompt
                </p>
                <div className="text-xs leading-relaxed whitespace-pre-wrap">
                  {body || "No prompt body defined"}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-border/40">
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => {
            navigator.clipboard.writeText(definition);
          }}>
            <Copy className="size-3" /> Copy Definition
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button size="sm" className="h-7 text-xs" onClick={() => onOpenChange(false)}>
              Save Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
