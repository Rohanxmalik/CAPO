import type { WebSocketEvent } from '@/lib/types';

const WS_BASE = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:4000';

type EventCallback = (event: WebSocketEvent) => void;

export class WorkspaceSocket {
  private ws: WebSocket | null = null;
  private listeners = new Set<EventCallback>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private workspaceId: string;

  constructor(workspaceId: string) {
    this.workspaceId = workspaceId;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(`${WS_BASE}/api/v1/workspaces/${this.workspaceId}/events`);

    this.ws.onmessage = (event) => {
      try {
        const parsed: WebSocketEvent = JSON.parse(event.data);
        for (const listener of this.listeners) {
          listener(parsed);
        }
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onclose = () => {
      this.reconnectTimer = setTimeout(() => this.connect(), 3000);
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
    this.listeners.clear();
  }

  onEvent(callback: EventCallback): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
}
