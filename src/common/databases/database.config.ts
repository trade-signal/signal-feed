import { isDev } from 'src/common/constants/env.constants';

export const postgresConfig = {
  type: 'postgres' as const,
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '123456',
  database: process.env.POSTGRES_DB || 'postgres',
  autoLoadEntities: true,
  synchronize: isDev ? true : false,
};

export const redisConfig = {
  prefix: process.env.REDIS_PREFIX || 'signal-feed',
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};
