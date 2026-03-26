import { cn } from "@/lib/utils";
import type { ModelProvider } from "@/lib/types";

const providerBg: Record<ModelProvider, string> = {
  anthropic: "bg-amber-900/30 text-amber-400 border-amber-800/40",
  openai: "bg-emerald-900/30 text-emerald-400 border-emerald-800/40",
  google: "bg-blue-900/30 text-blue-400 border-blue-800/40",
  groq: "bg-orange-900/30 text-orange-400 border-orange-800/40",
  ollama: "bg-zinc-800/40 text-zinc-300 border-zinc-700/40",
  custom: "bg-violet-900/30 text-violet-400 border-violet-800/40",
};

export function ModelBadge({
  provider,
  model,
  className,
}: {
  provider: ModelProvider;
  model: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border leading-none",
        providerBg[provider],
        className
      )}
    >
      {model}
    </span>
  );
}
