import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT ?? 4000),
  host: process.env.HOST ?? '0.0.0.0',
  nodeEnv: process.env.NODE_ENV ?? 'development',

  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://capo:capo_dev_password@localhost:5432/capo',
  },

  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },

  cors: {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? 'change-me-in-production',
  },
} as const;
