import { FastifyInstance } from 'fastify';
import { logError, logInfo } from './common/logger';
import { closeDB } from './db/connection';

export const handleExit = () => {
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

const gracefulShutdown = async () => {
  try {
    logInfo('🔵 Received shutdown signal, closing connections...');
    await closeDB();
    process.exit(0);
  } catch (error) {
    logError('🔴 Error during graceful shutdown', { error });
    process.exit(1);
  }
};

export const handleUncaughtErrors = () => {
  process.on('uncaughtException', (err) => {
    logError(`🔴 Uncaught Exception: ${err.message}`, { err });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logError(`🔴 Unhandled Rejection`, { reason, promise });
    process.exit(1);
  });
};
