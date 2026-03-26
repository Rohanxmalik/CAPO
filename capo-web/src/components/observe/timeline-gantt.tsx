"use client";

import { mockTasks } from "@/lib/mock";

const statusColors: Record<string, string> = {
  completed: "bg-capo-emerald",
  in_progress: "bg-primary animate-pulse",
  pending: "bg-muted-foreground/30",
  failed: "bg-capo-crimson",
  blocked: "bg-capo-amber",
  queued: "bg-muted-foreground/20",
  cancelled: "bg-muted-foreground/10",
};

export function TimelineGantt() {
  const tasks = mockTasks.filter((t) => t.status !== "cancelled");

  return (
    <div className="rounded-lg border border-border/40 bg-card/30 p-4">
      <h3 className="text-xs font-semibold mb-4">Task Timeline</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground w-[140px] truncate shrink-0">
              {task.title}
            </span>
            <div className="flex-1 h-5 bg-muted/20 rounded-sm overflow-hidden relative">
              <div
                className={`h-full rounded-sm transition-all duration-500 ${statusColors[task.status] ?? "bg-muted"}`}
                style={{
                  width:
                    task.status === "completed"
                      ? "100%"
                      : task.status === "in_progress"
                        ? "60%"
                        : task.status === "pending" || task.status === "queued"
                          ? "0%"
                          : "40%",
                }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground w-[70px] text-right capitalize shrink-0">
              {task.status.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
