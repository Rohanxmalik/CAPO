"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, Zap, Gauge, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useChatStore,
  AVAILABLE_MODELS,
  type ChatModel,
} from "@/lib/stores/chat-store";

const providerColors: Record<string, string> = {
  anthropic: "#D97706",
  openai: "#10B981",
  google: "#3B82F6",
  groq: "#F97316",
  ollama: "#8B5CF6",
};

const providerLabels: Record<string, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
  groq: "Groq",
  ollama: "Ollama",
};

const tierIcons: Record<string, React.ReactNode> = {
  frontier: <Sparkles className="size-2.5" />,
  balanced: <Gauge className="size-2.5" />,
  fast: <Zap className="size-2.5" />,
};

const tierLabels: Record<string, string> = {
  frontier: "Frontier",
  balanced: "Balanced",
  fast: "Fast",
};

export function ModelSelector() {
  const [open, setOpen] = useState(false);
  const selectedModel = useChatStore((s) => s.selectedModel);
  const setSelectedModel = useChatStore((s) => s.setSelectedModel);

  const grouped = AVAILABLE_MODELS.reduce(
    (acc, model) => {
      if (!acc[model.provider]) acc[model.provider] = [];
      acc[model.provider].push(model);
      return acc;
    },
    {} as Record<string, ChatModel[]>
  );

  const providerOrder = ["anthropic", "openai", "google", "groq", "ollama"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium",
          "bg-card/60 border border-border/30 hover:bg-card hover:border-border/50",
          "transition-colors cursor-pointer select-none",
          open && "bg-card border-border/50"
        )}
      >
        <span
          className="size-1.5 rounded-full"
          style={{ backgroundColor: providerColors[selectedModel.provider] }}
        />
        <span className="text-foreground/90">{selectedModel.displayName}</span>
        <ChevronDown
          className={cn(
            "size-2.5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-full left-0 mb-1.5 z-50 w-[240px] rounded-lg border border-border/40 bg-popover shadow-xl animate-in fade-in-0 slide-in-from-bottom-2 duration-150">
            <div className="p-1.5 border-b border-border/30">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1.5">
                Chat Model
              </span>
            </div>
            <div className="p-1 max-h-[300px] overflow-y-auto">
              {providerOrder.map((provider) => {
                const models = grouped[provider];
                if (!models) return null;
                return (
                  <div key={provider} className="mb-0.5">
                    <div className="flex items-center gap-1.5 px-2 py-1">
                      <span
                        className="size-1.5 rounded-full"
                        style={{
                          backgroundColor: providerColors[provider],
                        }}
                      />
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        {providerLabels[provider]}
                      </span>
                    </div>
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs",
                          "hover:bg-accent/50 transition-colors cursor-pointer",
                          selectedModel.id === model.id &&
                            "bg-accent/30 text-accent-foreground"
                        )}
                      >
                        <span className="flex-1 text-left font-medium">
                          {model.displayName}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full font-medium",
                            model.tier === "frontier" &&
                              "bg-amber-500/10 text-amber-500",
                            model.tier === "balanced" &&
                              "bg-blue-500/10 text-blue-500",
                            model.tier === "fast" &&
                              "bg-green-500/10 text-green-500"
                          )}
                        >
                          {tierIcons[model.tier]}
                          {tierLabels[model.tier]}
                        </span>
                        {selectedModel.id === model.id && (
                          <Check className="size-3 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
