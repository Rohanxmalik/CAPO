export type MessageType = 'task' | 'result' | 'question' | 'escalation' | 'system' | 'user';

export interface ToolCall {
  name: string;
  input: string;
  output: string;
  duration: number;
  cost: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  type: MessageType;
  content: string;
  model?: string;
  tokensUsed?: number;
  costUsd?: number;
  toolCalls?: ToolCall[];
  expandedPrompt?: string;
  rawResponse?: string;
  timestamp: string;
}
