import Redis from 'ioredis';
import { config } from '../config.js';

export const redis = new Redis(config.redis.url, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export const subscriber = new Redis(config.redis.url, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

subscriber.on('error', (err) => {
  console.error('Redis subscriber error:', err);
});
