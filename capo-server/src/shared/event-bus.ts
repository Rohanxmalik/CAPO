import { redis, subscriber } from './redis.js';

export type EventHandler = (channel: string, payload: unknown) => void;

const handlers: Map<string, Set<EventHandler>> = new Map();

export const eventBus = {
  async publish(channel: string, payload: unknown): Promise<void> {
    await redis.publish(channel, JSON.stringify(payload));
  },

  async subscribe(channel: string, handler: EventHandler): Promise<void> {
    if (!handlers.has(channel)) {
      handlers.set(channel, new Set());
      await subscriber.subscribe(channel);
    }
    handlers.get(channel)!.add(handler);
  },

  async unsubscribe(channel: string, handler: EventHandler): Promise<void> {
    const channelHandlers = handlers.get(channel);
    if (!channelHandlers) return;
    channelHandlers.delete(handler);
    if (channelHandlers.size === 0) {
      handlers.delete(channel);
      await subscriber.unsubscribe(channel);
    }
  },
};

subscriber.on('message', (channel, message) => {
  const channelHandlers = handlers.get(channel);
  if (!channelHandlers) return;
  try {
    const payload = JSON.parse(message);
    for (const handler of channelHandlers) {
      handler(channel, payload);
    }
  } catch {
    console.error(`Failed to parse event on channel ${channel}`);
  }
});
