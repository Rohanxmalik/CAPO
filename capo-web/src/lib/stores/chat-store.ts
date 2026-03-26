import { create } from 'zustand';

export type PermissionMode = 'auto' | 'ask' | 'deny';

export interface ChatModel {
  id: string;
  provider: 'anthropic' | 'openai' | 'google' | 'groq' | 'ollama';
  name: string;
  displayName: string;
  tier: 'frontier' | 'balanced' | 'fast';
}

export interface McpTool {
  id: string;
  name: string;
  category: 'code' | 'browser' | 'github' | 'search' | 'data' | 'communication' | 'custom';
  description: string;
  enabled: boolean;
}

export interface SlashCommand {
  id: string;
  name: string;
  description: string;
  category: 'workflow' | 'agent' | 'system' | 'debug';
  shortcut?: string;
}

export const AVAILABLE_MODELS: ChatModel[] = [
  { id: 'claude-opus-4', provider: 'anthropic', name: 'claude-opus-4', displayName: 'Claude Opus 4', tier: 'frontier' },
  { id: 'claude-sonnet-4', provider: 'anthropic', name: 'claude-sonnet-4', displayName: 'Claude Sonnet 4', tier: 'balanced' },
  { id: 'claude-haiku-4', provider: 'anthropic', name: 'claude-haiku-4', displayName: 'Claude Haiku 4', tier: 'fast' },
  { id: 'gpt-4o', provider: 'openai', name: 'gpt-4o', displayName: 'GPT-4o', tier: 'frontier' },
  { id: 'gpt-4o-mini', provider: 'openai', name: 'gpt-4o-mini', displayName: 'GPT-4o Mini', tier: 'fast' },
  { id: 'gemini-2.5-pro', provider: 'google', name: 'gemini-2.5-pro', displayName: 'Gemini 2.5 Pro', tier: 'frontier' },
  { id: 'gemini-2.5-flash', provider: 'google', name: 'gemini-2.5-flash', displayName: 'Gemini 2.5 Flash', tier: 'fast' },
  { id: 'llama-4-scout', provider: 'groq', name: 'llama-4-scout', displayName: 'Llama 4 Scout', tier: 'fast' },
  { id: 'llama-4-maverick', provider: 'groq', name: 'llama-4-maverick', displayName: 'Llama 4 Maverick', tier: 'balanced' },
  { id: 'ollama-local', provider: 'ollama', name: 'ollama-local', displayName: 'Ollama (Local)', tier: 'fast' },
];

export const AVAILABLE_TOOLS: McpTool[] = [
  { id: 'read', name: 'Read', category: 'code', description: 'Read file contents', enabled: true },
  { id: 'write', name: 'Write', category: 'code', description: 'Write file contents', enabled: true },
  { id: 'edit', name: 'Edit', category: 'code', description: 'Edit file contents', enabled: true },
  { id: 'bash', name: 'Bash', category: 'code', description: 'Execute shell commands', enabled: true },
  { id: 'grep', name: 'Grep', category: 'code', description: 'Search file contents', enabled: true },
  { id: 'glob', name: 'Glob', category: 'code', description: 'Find files by pattern', enabled: true },
  { id: 'navigate', name: 'Navigate', category: 'browser', description: 'Navigate browser to URL', enabled: false },
  { id: 'click', name: 'Click', category: 'browser', description: 'Click element in browser', enabled: false },
  { id: 'screenshot', name: 'Screenshot', category: 'browser', description: 'Take browser screenshot', enabled: false },
  { id: 'fill', name: 'Fill', category: 'browser', description: 'Fill form fields', enabled: false },
  { id: 'create-pr', name: 'CreatePR', category: 'github', description: 'Create pull request', enabled: true },
  { id: 'review-pr', name: 'ReviewPR', category: 'github', description: 'Review pull request', enabled: true },
  { id: 'merge-pr', name: 'MergePR', category: 'github', description: 'Merge pull request', enabled: false },
  { id: 'create-issue', name: 'CreateIssue', category: 'github', description: 'Create GitHub issue', enabled: true },
  { id: 'web-search', name: 'WebSearch', category: 'search', description: 'Search the internet', enabled: true },
  { id: 'web-fetch', name: 'WebFetch', category: 'search', description: 'Fetch web page content', enabled: true },
  { id: 'sql-query', name: 'SQL Query', category: 'data', description: 'Execute SQL queries', enabled: false },
  { id: 'csv-parse', name: 'CSV Parse', category: 'data', description: 'Parse CSV files', enabled: false },
  { id: 'slack', name: 'Slack', category: 'communication', description: 'Send Slack messages', enabled: false },
  { id: 'email', name: 'Email', category: 'communication', description: 'Send email messages', enabled: false },
  { id: 'webhook', name: 'Webhook', category: 'communication', description: 'Trigger webhooks', enabled: false },
];

export const SLASH_COMMANDS: SlashCommand[] = [
  { id: 'plan', name: '/plan', description: 'Activate planning mode — CEO decomposes without executing', category: 'workflow', shortcut: '⌘P' },
  { id: 'deploy', name: '/deploy', description: 'Deploy agent team to production', category: 'workflow' },
  { id: 'monitor', name: '/monitor', description: 'Live tail of agent activity', category: 'workflow' },
  { id: 'status', name: '/status', description: 'Show task and agent status overview', category: 'workflow' },
  { id: 'agent-create', name: '/agent create', description: 'Create a new agent from template', category: 'agent' },
  { id: 'agent-list', name: '/agent list', description: 'List all agents and their status', category: 'agent' },
  { id: 'agent-config', name: '/agent config', description: 'Open agent configuration', category: 'agent' },
  { id: 'agent-spawn', name: '/agent spawn', description: 'Spawn a new sub-agent', category: 'agent' },
  { id: 'task', name: '/task', description: 'Submit a new task to the selected agent', category: 'system' },
  { id: 'budget', name: '/budget', description: 'Show budget utilization across all agents', category: 'system' },
  { id: 'observe', name: '/observe', description: 'Open observability dashboard', category: 'system' },
  { id: 'workflow', name: '/workflow', description: 'Execute a workflow definition', category: 'system' },
  { id: 'memory', name: '/memory', description: 'Query or manage agent memory', category: 'system' },
  { id: 'debug', name: '/debug', description: 'Toggle debug mode for verbose output', category: 'debug' },
  { id: 'inspect', name: '/inspect', description: 'Inspect last agent prompt and response', category: 'debug' },
  { id: 'audit', name: '/audit', description: 'View recent audit log entries', category: 'debug' },
  { id: 'help', name: '/help', description: 'Show available commands and usage', category: 'system' },
  { id: 'clear', name: '/clear', description: 'Clear the chat history', category: 'system' },
];

interface ChatStore {
  selectedModel: ChatModel;
  permissionMode: PermissionMode;
  tools: McpTool[];
  isSlashMenuOpen: boolean;
  slashFilter: string;
  isThinkingEnabled: boolean;

  setSelectedModel: (model: ChatModel) => void;
  setPermissionMode: (mode: PermissionMode) => void;
  toggleTool: (toolId: string) => void;
  setToolEnabled: (toolId: string, enabled: boolean) => void;
  setSlashMenuOpen: (open: boolean) => void;
  setSlashFilter: (filter: string) => void;
  setThinkingEnabled: (enabled: boolean) => void;
  getEnabledToolCount: () => number;
  getToolsByCategory: () => Record<string, McpTool[]>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  selectedModel: AVAILABLE_MODELS[0],
  permissionMode: 'auto',
  tools: AVAILABLE_TOOLS,
  isSlashMenuOpen: false,
  slashFilter: '',
  isThinkingEnabled: true,

  setSelectedModel: (model) => set({ selectedModel: model }),
  setPermissionMode: (mode) => set({ permissionMode: mode }),
  toggleTool: (toolId) =>
    set((state) => ({
      tools: state.tools.map((t) =>
        t.id === toolId ? { ...t, enabled: !t.enabled } : t
      ),
    })),
  setToolEnabled: (toolId, enabled) =>
    set((state) => ({
      tools: state.tools.map((t) =>
        t.id === toolId ? { ...t, enabled } : t
      ),
    })),
  setSlashMenuOpen: (open) => set({ isSlashMenuOpen: open }),
  setSlashFilter: (filter) => set({ slashFilter: filter }),
  setThinkingEnabled: (enabled) => set({ isThinkingEnabled: enabled }),
  getEnabledToolCount: () => get().tools.filter((t) => t.enabled).length,
  getToolsByCategory: () => {
    const grouped: Record<string, McpTool[]> = {};
    for (const tool of get().tools) {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    }
    return grouped;
  },
}));
