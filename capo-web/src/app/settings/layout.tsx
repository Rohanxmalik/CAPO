"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const settingsTabs = [
  { label: "Cost Breakdown", href: "/settings/cost" },
  { label: "Governance", href: "/settings/governance" },
  { label: "Models", href: "/settings/models" },
  { label: "Project", href: "/settings/project" },
] as const;

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ScrollArea className="flex-1">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold">Settings</h1>
        </div>

        {/* Tab Navigation */}
        <nav className="flex gap-1 border-b border-border/40 pb-px">
          {settingsTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-4 py-2 text-xs font-medium rounded-t-md transition-colors relative",
                  isActive
                    ? "text-foreground bg-card/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                )}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div>{children}</div>
      </div>
    </ScrollArea>
  );
}
