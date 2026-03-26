"use client";

import {
  GitBranch,
  Code2,
  Database,
  MessageSquare,
  Shield,
  Zap,
  Search,
  FileText,
  Settings2,
} from "lucide-react";
import { PhaseTwoStub } from "@/components/shared/phase-two-stub";

const nodeTypes = [
  { icon: Zap, label: "Trigger", color: "text-capo-amber" },
  { icon: Code2, label: "Code Agent", color: "text-primary" },
  { icon: MessageSquare, label: "LLM Call", color: "text-capo-emerald" },
  { icon: GitBranch, label: "Branch", color: "text-capo-violet" },
  { icon: Database, label: "Data Store", color: "text-blue-400" },
  { icon: Search, label: "Web Search", color: "text-orange-400" },
  { icon: Shield, label: "Gate", color: "text-capo-crimson" },
  { icon: FileText, label: "Template", color: "text-teal-400" },
  { icon: Settings2, label: "Transform", color: "text-muted-foreground" },
] as const;

export default function BuildPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PhaseTwoStub
        feature="Workflow Builder"
        description="Visually compose multi-agent workflows with a drag-and-drop canvas. Chain LLM calls, code agents, gates, and data transforms into powerful automation pipelines."
      />

      {/* Node Palette Preview */}
      <div className="px-6 pb-6 max-w-[800px] mx-auto w-full">
        <div className="rounded-lg border border-border/40 bg-card/30 p-4">
          <h3 className="text-xs font-semibold mb-3 text-center text-muted-foreground">
            Available Node Types
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {nodeTypes.map((node) => (
              <div
                key={node.label}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-md border border-border/30 bg-background/50 hover:bg-accent/20 transition-colors cursor-not-allowed opacity-60"
              >
                <node.icon className={`size-4 ${node.color}`} />
                <span className="text-xs font-medium">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
