import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import { config } from '../config.js';

export async function registerCors(app: FastifyInstance) {
  await app.register(cors, {
    origin: config.cors.origin,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
}
