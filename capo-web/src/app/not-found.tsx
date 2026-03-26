import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center animate-fade-in-up">
        <p className="text-6xl font-bold text-primary/20 mb-2">404</p>
        <p className="text-sm text-muted-foreground mb-6">Page not found</p>
        <Link
          href="/workspace"
          className="inline-flex shrink-0 items-center justify-center rounded-[min(var(--radius-md),12px)] border border-border bg-background hover:bg-muted hover:text-foreground h-7 gap-1 px-2.5 text-[0.8rem] font-medium transition-all"
        >
          <ArrowLeft className="size-3.5 mr-1.5" />
          Back to Workspace
        </Link>
      </div>
    </div>
  );
}
