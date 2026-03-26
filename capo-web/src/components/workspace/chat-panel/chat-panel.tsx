"use client";

import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgents } from "@/lib/hooks";
import { mockMessages } from "@/lib/mock";
import { StatusIndicator } from "@/components/shared/status-indicator";
import { useChatStore } from "@/lib/stores/chat-store";
import { MessageBlock } from "./message-block";
import { ChatInput } from "./chat-input";

export function ChatPanel() {
  const { selectedAgent } = useAgents();
  const selectedModel = useChatStore((s) => s.selectedModel);
  const permissionMode = useChatStore((s) => s.permissionMode);

  const filteredMessages = mockMessages.filter(
    (m) =>
      m.senderId === selectedAgent?.id || m.recipientId === selectedAgent?.id
  );

  const handleSendMessage = (message: string) => {
    // TODO: Wire to backend — for now just log
    console.log("[CAPO Chat]", {
      message,
      agent: selectedAgent?.displayName,
      model: selectedModel.displayName,
      permissionMode,
    });
  };

  return (
    <div className="flex flex-col h-full border-l border-border/40 bg-sidebar">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40">
        <MessageSquare className="size-3.5 text-muted-foreground" />
        {selectedAgent ? (
          <>
            <StatusIndicator status={selectedAgent.status} />
            <span className="text-xs font-semibold truncate">
              {selectedAgent.displayName}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {selectedAgent.role}
            </span>
          </>
        ) : (
          <span className="text-xs text-muted-foreground">Select an agent</span>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <MessageBlock key={msg.id} message={msg} />
            ))
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">
              No messages yet
            </p>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput
        agentName={selectedAgent?.displayName ?? "CEO"}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
