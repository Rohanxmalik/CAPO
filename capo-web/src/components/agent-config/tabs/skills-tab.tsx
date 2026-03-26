"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Agent } from "@/lib/types";

const availableSkills = [
  { id: "strategic-planning", name: "Strategic Planning", category: "management", desc: "Break down complex tasks into phased plans" },
  { id: "task-decomposition", name: "Task Decomposition", category: "management", desc: "Split work into delegatable atomic sub-tasks" },
  { id: "synthesis", name: "Synthesis", category: "management", desc: "Merge results from multiple agents into deliverables" },
  { id: "code-review", name: "Code Review", category: "development", desc: "Review code for quality, security, and patterns" },
  { id: "architecture", name: "Architecture", category: "development", desc: "Design system architecture and technical decisions" },
  { id: "technical-planning", name: "Technical Planning", category: "development", desc: "Plan technical implementation and dependencies" },
  { id: "coding-standards", name: "Coding Standards", category: "development", desc: "Enforce style guides, naming conventions, file limits" },
  { id: "frontend-patterns", name: "Frontend Patterns", category: "development", desc: "React, Next.js, Tailwind, component design" },
  { id: "backend-patterns", name: "Backend Patterns", category: "development", desc: "API design, database schemas, server architecture" },
  { id: "test-driven-development", name: "Test-Driven Development", category: "development", desc: "Red-Green-Refactor cycle, coverage enforcement" },
  { id: "e2e-testing", name: "E2E Testing", category: "testing", desc: "Playwright browser testing and flow validation" },
  { id: "database-design", name: "Database Design", category: "development", desc: "Schema design, migrations, query optimization" },
  { id: "content-writing", name: "Content Writing", category: "content", desc: "Marketing copy, blog posts, documentation" },
  { id: "content-strategy", name: "Content Strategy", category: "content", desc: "Content planning, audience targeting, SEO" },
  { id: "market-research", name: "Market Research", category: "research", desc: "Competitive analysis and market intelligence" },
  { id: "competitive-analysis", name: "Competitive Analysis", category: "research", desc: "Analyze competitors, identify opportunities" },
  { id: "data-gathering", name: "Data Gathering", category: "research", desc: "Collect, structure, and validate external data" },
  { id: "seo-optimization", name: "SEO Optimization", category: "content", desc: "Search engine optimization and keyword targeting" },
  { id: "copywriting", name: "Copywriting", category: "content", desc: "Persuasive copy for CTAs, headlines, ads" },
  { id: "ui-design", name: "UI Design", category: "design", desc: "Visual design, layout, color systems" },
  { id: "wireframing", name: "Wireframing", category: "design", desc: "Low-fidelity mockups and flow diagrams" },
  { id: "design-systems", name: "Design Systems", category: "design", desc: "Component libraries, tokens, consistency" },
  { id: "financial-analysis", name: "Financial Analysis", category: "analytics", desc: "Budget analysis, cost projections, ROI" },
  { id: "budget-optimization", name: "Budget Optimization", category: "analytics", desc: "Optimize agent spending and model routing" },
  { id: "cost-forecasting", name: "Cost Forecasting", category: "analytics", desc: "Predict future costs based on usage patterns" },
  { id: "process-optimization", name: "Process Optimization", category: "operations", desc: "Streamline workflows and reduce overhead" },
  { id: "workflow-design", name: "Workflow Design", category: "operations", desc: "Design task flows and coordination patterns" },
  { id: "team-coordination", name: "Team Coordination", category: "operations", desc: "Cross-agent communication and scheduling" },
  { id: "docker", name: "Docker", category: "infrastructure", desc: "Container management, Dockerfiles, Compose" },
  { id: "ci-cd", name: "CI/CD", category: "infrastructure", desc: "Build pipelines, deployment automation" },
  { id: "infrastructure", name: "Infrastructure", category: "infrastructure", desc: "Cloud provisioning, monitoring, scaling" },
  { id: "brand-management", name: "Brand Management", category: "content", desc: "Brand voice, guidelines, consistency" },
] as const;

const categoryColors: Record<string, string> = {
  management: "#8b5cf6",
  development: "#3b82f6",
  testing: "#10b981",
  content: "#f59e0b",
  research: "#06b6d4",
  design: "#ec4899",
  analytics: "#6366f1",
  operations: "#14b8a6",
  infrastructure: "#64748b",
};

export function SkillsTab({ agent }: { agent: Agent }) {
  const [filter, setFilter] = useState("");

  const attached = new Set(agent.skills);

  const grouped = availableSkills
    .filter((s) =>
      filter === ""
        ? true
        : s.name.toLowerCase().includes(filter.toLowerCase()) ||
          s.category.toLowerCase().includes(filter.toLowerCase())
    )
    .reduce(
      (acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, typeof availableSkills[number][]>
    );

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        <Input
          placeholder="Filter skills..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-7 text-xs pl-7"
        />
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] text-muted-foreground">Attached:</span>
        {agent.skills.map((s) => (
          <Badge key={s} variant="secondary" className="text-[9px] h-4 px-1.5">
            {s}
          </Badge>
        ))}
      </div>

      {Object.entries(grouped).map(([category, skills]) => (
        <div key={category}>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">
            {category}
          </p>
          <div className="space-y-1.5">
            {skills.map((skill) => {
              const isAttached = attached.has(skill.id);
              const color = categoryColors[skill.category] ?? "#6b7280";

              return (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-md border border-border/40 bg-card/30 px-3 py-2"
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium">{skill.name}</span>
                      <span
                        className="text-[8px] px-1 rounded font-medium"
                        style={{ color, backgroundColor: `${color}15` }}
                      >
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {skill.desc}
                    </p>
                  </div>
                  <Switch defaultChecked={isAttached} className="scale-75" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
