import { FastifyInstance } from 'fastify';
import { logError, logInfo } from './common/logger';
import mongoose from 'mongoose';

export const handleExit = () => {
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

const gracefulShutdown = async () => {
  try {
    logInfo('🔵 Received shutdown signal, closing connections...');

    // Close database connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      logInfo('🔵 Database connection closed');
    }

    process.exit(0);
  } catch (error) {
    logError('🔴 Error during graceful shutdown', { error });
    process.exit(1);
  }
};

export const handleUncaughtErrors = () => {
  process.on('uncaughtException', (err) => {
    logError('🔴 Uncaught Exception:', err);
    process.exit(1);
  });


  process.on('unhandledRejection', (reason, promise) => {
    logError(`🔴 Unhandled Rejection at: ${promise}, reason: ${reason}`, { promise, reason });
    process.exit(1);
  });
};
