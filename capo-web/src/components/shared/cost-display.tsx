import { cn } from "@/lib/utils";
import { formatCost } from "@/lib/utils/format-cost";
import { formatTokens } from "@/lib/utils/format-tokens";

export function CostDisplay({
  cost,
  tokens,
  className,
}: {
  cost: number;
  tokens?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", className)}>
      <span className="text-capo-emerald font-medium">{formatCost(cost)}</span>
      {tokens !== undefined && (
        <span className="text-muted-foreground">{formatTokens(tokens)} tok</span>
      )}
    </span>
  );
}
