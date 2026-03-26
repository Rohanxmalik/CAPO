"use client";

import { cn } from "@/lib/utils";
import {
  Crown,
  Briefcase,
  Wrench,
  User,
  LayoutGrid,
} from "lucide-react";

const categories = [
  { key: "all", label: "All Agents", icon: LayoutGrid },
  { key: "ceo", label: "CEO", icon: Crown },
  { key: "manager", label: "Managers", icon: Briefcase },
  { key: "worker", label: "Workers", icon: Wrench },
] as const;

const domains = [
  "coder",
  "tester",
  "researcher",
  "writer",
  "designer",
  "analyst",
  "ops",
  "coordinator",
];

export function AgentSidebar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="w-[180px] border-r border-border/40 bg-sidebar flex flex-col p-3 gap-4">
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2 px-2">
          Categories
        </p>
        <div className="space-y-0.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => onSelect(cat.key)}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors",
                  selected === cat.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <Icon className="size-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2 px-2">
          By Type
        </p>
        <div className="space-y-0.5">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => onSelect(d)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs capitalize transition-colors",
                selected === d
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <User className="size-3" />
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
