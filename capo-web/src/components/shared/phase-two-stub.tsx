import { Construction } from "lucide-react";

export function PhaseTwoStub({
  feature,
  description,
}: {
  feature: string;
  description?: string;
}) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="mx-auto size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Construction className="size-8 text-primary/60" />
        </div>
        <h2 className="text-lg font-semibold mb-1">{feature}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description ?? "This feature is coming in Phase 2. Stay tuned."}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/30 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-capo-amber animate-pulse" />
          Phase 2 Roadmap
        </div>
      </div>
    </div>
  );
}
