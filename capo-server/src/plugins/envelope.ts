import type { FastifyReply } from 'fastify';
import crypto from 'node:crypto';

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  meta: {
    requestId: string;
    timestamp: string;
    pagination?: {
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    };
  };
}

export function success<T>(
  reply: FastifyReply,
  data: T,
  pagination?: ApiEnvelope['meta']['pagination'],
  statusCode = 200
) {
  const envelope: ApiEnvelope<T> = {
    success: true,
    data,
    error: null,
    meta: {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...(pagination ? { pagination } : {}),
    },
  };
  return reply.status(statusCode).send(envelope);
}

export function error(
  reply: FastifyReply,
  message: string,
  statusCode = 500
) {
  const envelope: ApiEnvelope<null> = {
    success: false,
    data: null,
    error: message,
    meta: {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    },
  };
  return reply.status(statusCode).send(envelope);
}
