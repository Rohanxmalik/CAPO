"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Send, Paperclip, AtSign, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatStore, type SlashCommand } from "@/lib/stores/chat-store";
import { ChatToolbar } from "./chat-toolbar";
import { SlashCommandMenu } from "./slash-command-menu";

interface ChatInputProps {
  agentName: string;
  onSendMessage?: (message: string) => void;
}

export function ChatInput({ agentName, onSendMessage }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectedModel = useChatStore((s) => s.selectedModel);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => {
    autoResize();
  }, [value, autoResize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Detect slash command trigger
    if (newValue === "/") {
      setShowSlashMenu(true);
      setSlashFilter("");
    } else if (newValue.startsWith("/") && !newValue.includes(" ")) {
      setShowSlashMenu(true);
      setSlashFilter(newValue);
    } else {
      setShowSlashMenu(false);
      setSlashFilter("");
    }
  };

  const handleSlashSelect = (command: SlashCommand) => {
    setValue(command.name + " ");
    setShowSlashMenu(false);
    setSlashFilter("");
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSendMessage?.(value.trim());
    setValue("");
    setShowSlashMenu(false);
    setSlashFilter("");
    // Simulate streaming for demo
    setIsStreaming(true);
    setTimeout(() => setIsStreaming(false), 2000);
  };

  const handleStop = () => {
    setIsStreaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showSlashMenu) return; // Let command menu handle it
      handleSubmit();
    }
    if (e.key === "Escape") {
      setShowSlashMenu(false);
    }
  };

  return (
    <div className="border-t border-border/40 bg-card/20">
      {/* Toolbar */}
      <ChatToolbar />

      {/* Input area */}
      <div className="relative px-2 pb-2">
        {/* Slash command menu */}
        {showSlashMenu && (
          <SlashCommandMenu
            filter={slashFilter}
            onSelect={handleSlashSelect}
            onClose={() => setShowSlashMenu(false)}
          />
        )}

        <div
          className={cn(
            "flex items-end gap-1.5 rounded-lg border border-border/40 bg-card/50",
            "focus-within:border-border/60 focus-within:bg-card/70",
            "transition-colors"
          )}
        >
          {/* Attachment button */}
          <button
            className="p-1.5 pb-2 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer"
            title="Attach file"
          >
            <Paperclip className="size-3.5" />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${agentName}...`}
            rows={1}
            className={cn(
              "flex-1 min-h-8 max-h-40 py-2 text-xs",
              "bg-transparent border-0 outline-none resize-none",
              "placeholder:text-muted-foreground/40"
            )}
          />

          {/* Mention button */}
          <button
            className="p-1.5 pb-2 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer"
            title="Mention agent (@)"
          >
            <AtSign className="size-3.5" />
          </button>

          {/* Send / Stop button */}
          {isStreaming ? (
            <Button
              size="icon"
              variant="ghost"
              className="size-8 shrink-0 mb-0.5 mr-0.5 text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleStop}
            >
              <StopCircle className="size-3.5" />
            </Button>
          ) : (
            <Button
              size="icon"
              className="size-8 shrink-0 mb-0.5 mr-0.5"
              onClick={handleSubmit}
              disabled={!value.trim()}
            >
              <Send className="size-3.5" />
            </Button>
          )}
        </div>

        {/* Bottom hints */}
        <div className="flex items-center justify-between mt-1 px-0.5">
          <span className="text-[9px] text-muted-foreground/30">
            <kbd className="px-1 py-0.5 rounded bg-muted/20 font-mono">Enter</kbd>
            {" "}to send{" "}
            <kbd className="px-1 py-0.5 rounded bg-muted/20 font-mono">Shift+Enter</kbd>
            {" "}for newline
          </span>
          <span className="text-[9px] text-muted-foreground/30 font-mono">
            {selectedModel.displayName}
          </span>
        </div>
      </div>
    </div>
  );
}
