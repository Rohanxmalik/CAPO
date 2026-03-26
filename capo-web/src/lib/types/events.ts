export type WebSocketEventType =
  | 'agent.status'
  | 'agent.message'
  | 'agent.tool_call'
  | 'agent.model_call'
  | 'task.update'
  | 'task.completed'
  | 'workflow.step'
  | 'budget.alert'
  | 'connection.established'
  | 'connection.lost';

export interface WebSocketEvent {
  type: WebSocketEventType;
  payload: Record<string, unknown>;
  timestamp: string;
}
