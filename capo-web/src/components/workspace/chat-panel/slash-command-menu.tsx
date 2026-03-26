"use client";

import { useRef, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  GitBranch,
  Rocket,
  Activity,
  BarChart3,
  Bot,
  ListTree,
  Settings,
  Zap,
  ClipboardList,
  DollarSign,
  Eye,
  Workflow,
  Brain,
  Bug,
  Search,
  FileText,
  HelpCircle,
  Trash2,
} from "lucide-react";
import { SLASH_COMMANDS, type SlashCommand } from "@/lib/stores/chat-store";

const commandIcons: Record<string, React.ReactNode> = {
  plan: <GitBranch className="size-3.5" />,
  deploy: <Rocket className="size-3.5" />,
  monitor: <Activity className="size-3.5" />,
  status: <BarChart3 className="size-3.5" />,
  "agent-create": <Bot className="size-3.5" />,
  "agent-list": <ListTree className="size-3.5" />,
  "agent-config": <Settings className="size-3.5" />,
  "agent-spawn": <Zap className="size-3.5" />,
  task: <ClipboardList className="size-3.5" />,
  budget: <DollarSign className="size-3.5" />,
  observe: <Eye className="size-3.5" />,
  workflow: <Workflow className="size-3.5" />,
  memory: <Brain className="size-3.5" />,
  debug: <Bug className="size-3.5" />,
  inspect: <Search className="size-3.5" />,
  audit: <FileText className="size-3.5" />,
  help: <HelpCircle className="size-3.5" />,
  clear: <Trash2 className="size-3.5" />,
};

const categoryLabels: Record<string, string> = {
  workflow: "Workflow",
  agent: "Agent Management",
  system: "System",
  debug: "Debug & Inspect",
};

interface SlashCommandMenuProps {
  filter: string;
  onSelect: (command: SlashCommand) => void;
  onClose: () => void;
}

export function SlashCommandMenu({
  filter,
  onSelect,
  onClose,
}: SlashCommandMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const grouped = SLASH_COMMANDS.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, SlashCommand[]>
  );

  const categoryOrder = ["workflow", "agent", "system", "debug"];

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-0 right-0 mb-1 z-50 animate-in fade-in-0 slide-in-from-bottom-2 duration-150"
    >
      <Command className="rounded-lg border border-border/40 bg-popover shadow-xl max-h-[280px]">
        <CommandInput
          placeholder="Search commands..."
          value={filter}
          className="text-xs h-8"
        />
        <CommandList className="max-h-[220px]">
          <CommandEmpty className="text-xs py-4">
            No commands found.
          </CommandEmpty>
          {categoryOrder.map((cat, i) => {
            const commands = grouped[cat];
            if (!commands) return null;
            return (
              <div key={cat}>
                {i > 0 && <CommandSeparator />}
                <CommandGroup heading={categoryLabels[cat]}>
                  {commands.map((cmd) => (
                    <CommandItem
                      key={cmd.id}
                      value={cmd.name}
                      onSelect={() => onSelect(cmd)}
                      className="gap-2.5 py-1.5 cursor-pointer"
                    >
                      <span className="text-muted-foreground">
                        {commandIcons[cmd.id] ?? (
                          <ClipboardList className="size-3.5" />
                        )}
                      </span>
                      <div className="flex flex-col gap-0">
                        <span className="text-xs font-medium font-mono">
                          {cmd.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-tight">
                          {cmd.description}
                        </span>
                      </div>
                      {cmd.shortcut && (
                        <span className="ml-auto text-[10px] text-muted-foreground/60 font-mono">
                          {cmd.shortcut}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            );
          })}
        </CommandList>
      </Command>
    </div>
  );
}
