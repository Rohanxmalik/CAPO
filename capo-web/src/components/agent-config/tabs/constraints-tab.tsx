"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { Agent } from "@/lib/types";

export function ConstraintsTab({ agent }: { agent: Agent }) {
  const { constraints } = agent;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-xs">Max Concurrent Tasks</Label>
        <Input
          type="number"
          defaultValue={constraints.maxConcurrentTasks}
          min={1}
          max={10}
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Max File Size (lines)</Label>
        <Input
          type="number"
          defaultValue={constraints.maxFileSizeLines}
          className="h-8 text-xs"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-xs">Require Tests</Label>
          <p className="text-[10px] text-muted-foreground">Must write tests before code</p>
        </div>
        <Switch defaultChecked={constraints.requiredTests} className="scale-75" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-xs">Code Review Required</Label>
          <p className="text-[10px] text-muted-foreground">Output must be reviewed</p>
        </div>
        <Switch defaultChecked={constraints.codeReviewRequired} className="scale-75" />
      </div>

      {constraints.deniedActions && constraints.deniedActions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs">Denied Actions</Label>
          <div className="flex flex-wrap gap-1">
            {constraints.deniedActions.map((action) => (
              <Badge key={action} variant="destructive" className="text-[10px]">
                {action}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
