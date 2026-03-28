import Fastify from 'fastify';
import { config } from './config.js';
import { registerCors } from './plugins/cors.js';
import { registerWebSocket } from './plugins/websocket.js';
import { error as errorEnvelope } from './plugins/envelope.js';
import { workspaceRoutes } from './governance/application/workspace-routes.js';
import { agentRoutes } from './agent-lifecycle/application/agent-routes.js';
import { taskRoutes } from './task-execution/application/task-routes.js';
import { budgetRoutes } from './budget/application/budget-routes.js';
import { auditRoutes } from './governance/application/audit-routes.js';
import { memoryRoutes } from './memory/application/memory-routes.js';
import { redis, subscriber } from './shared/redis.js';
import { AppError } from './shared/errors.js';

const app = Fastify({ logger: true });

// Plugins
await registerCors(app);
await registerWebSocket(app);

// Routes
await app.register(workspaceRoutes);
await app.register(agentRoutes);
await app.register(taskRoutes);
await app.register(budgetRoutes);
await app.register(auditRoutes);
await app.register(memoryRoutes);

// Health check
app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

// Global error handler
app.setErrorHandler((err, _req, reply) => {
  if (err instanceof AppError) {
    return errorEnvelope(reply, err.message, err.statusCode);
  }
  app.log.error(err);
  return errorEnvelope(reply, 'Internal server error', 500);
});

// Startup
async function start() {
  try {
    await redis.connect();
    await subscriber.connect();
    await app.listen({ port: config.port, host: config.host });
    console.log(`CAPO Server running on http://${config.host}:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down...');
  await app.close();
  await redis.quit();
  await subscriber.quit();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
