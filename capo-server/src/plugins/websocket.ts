import websocket from '@fastify/websocket';
import type { FastifyInstance } from 'fastify';
import { eventBus, type EventHandler } from '../shared/event-bus.js';

export async function registerWebSocket(app: FastifyInstance) {
  await app.register(websocket);

  app.get('/api/v1/workspaces/:workspaceId/events', { websocket: true }, (socket, req) => {
    const { workspaceId } = req.params as { workspaceId: string };
    const channel = `workspace:${workspaceId}:events`;

    const handler: EventHandler = (_ch, payload) => {
      if (socket.readyState === 1) {
        socket.send(JSON.stringify(payload));
      }
    };

    eventBus.subscribe(channel, handler);

    socket.on('close', () => {
      eventBus.unsubscribe(channel, handler);
    });

    socket.send(JSON.stringify({
      type: 'connection.established',
      payload: { workspaceId },
      timestamp: new Date().toISOString(),
    }));
  });
}
