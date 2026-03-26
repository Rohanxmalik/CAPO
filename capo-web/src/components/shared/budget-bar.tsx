import { cn } from "@/lib/utils";

export function BudgetBar({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  const barColor =
    clampedPercent < 50
      ? "bg-emerald-500"
      : clampedPercent < 75
        ? "bg-yellow-500"
        : clampedPercent < 90
          ? "bg-orange-500"
          : "bg-red-500";

  return (
    <div
      className={cn(
        "h-1 w-full rounded-full bg-muted overflow-hidden",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", barColor)}
        style={{ width: `${clampedPercent}%` }}
      />
    </div>
  );
}
