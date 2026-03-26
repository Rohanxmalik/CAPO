"use client";

import { WorkflowDag } from "./workflow-dag";
import { MetricsTicker } from "./metrics-ticker";

export function WorkflowCanvasPanel() {
  return (
    <div className="flex flex-col h-full relative">
      <WorkflowDag />
      <MetricsTicker />
    </div>
  );
}
