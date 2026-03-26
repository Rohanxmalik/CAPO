"use client";

import { useState } from "react";
import { ChevronDown, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CostDisplay } from "@/components/shared/cost-display";
import { formatTimestamp } from "@/lib/utils/format-date";
import { messageTypeColors } from "@/lib/utils/colors";
import type { ChatMessage } from "@/lib/types";

export function MessageBlock({ message }: { message: ChatMessage }) {
  const [expanded, setExpanded] = useState(false);
  const typeColor = messageTypeColors[message.type] ?? "#6b7280";

  return (
    <div className="rounded-lg border border-border/40 bg-card/30 p-2.5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <Badge
          variant="outline"
          className="text-[9px] h-4 px-1 border-0 font-semibold uppercase"
          style={{ color: typeColor, backgroundColor: `${typeColor}15` }}
        >
          {message.type}
        </Badge>
        <span className="text-[10px] text-muted-foreground">
          {message.senderName}
        </span>
        <span className="text-[10px] text-muted-foreground/50">→</span>
        <span className="text-[10px] text-muted-foreground">
          {message.recipientName}
        </span>
        <span className="text-[10px] text-muted-foreground/40 ml-auto">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>

      {/* Content */}
      <p className="text-xs leading-relaxed whitespace-pre-wrap">
        {message.content}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between mt-2">
        {message.costUsd !== undefined && (
          <CostDisplay
            cost={message.costUsd}
            tokens={message.tokensUsed}
            className="text-[10px]"
          />
        )}
        {message.model && (
          <span className="text-[10px] text-muted-foreground/60">
            {message.model}
          </span>
        )}
      </div>

      {/* Expandable tool calls */}
      {message.toolCalls && message.toolCalls.length > 0 && (
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleTrigger className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
            <Wrench className="size-2.5" />
            <span>{message.toolCalls.length} tool call{message.toolCalls.length > 1 ? "s" : ""}</span>
            <ChevronDown
              className={cn(
                "size-2.5 transition-transform",
                expanded && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-1.5 space-y-1">
              {message.toolCalls.map((tc, i) => (
                <div
                  key={i}
                  className="rounded bg-muted/30 p-2 text-[10px] font-mono"
                >
                  <span className="text-primary font-semibold">{tc.name}</span>
                  <pre className="text-muted-foreground mt-0.5 whitespace-pre-wrap break-all">
                    {tc.output.slice(0, 200)}
                    {tc.output.length > 200 && "..."}
                  </pre>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
