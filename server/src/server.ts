import { FastifyInstance } from 'fastify';
import createServer from './createServer';
import { handleExit, handleUncaughtErrors } from './errorHandlers';
import { logError, logInfo } from './common/logger';
import { PORT, NODE_ENV, MONGO_URI } from './common/config';
import { connectDB } from './db/connection';


const start = async () => {
  try {
    handleExit();
    handleUncaughtErrors();

    await connectDB();
    logInfo('🟢 MongoDB connected successfully');

    const server: FastifyInstance = await createServer();
    
    await server.listen({ port: Number(PORT), host: '0.0.0.0' });
    logInfo(`🟢 Server running on port ${PORT} in ${NODE_ENV} mode`);
  } catch (error: unknown) {
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      code: error instanceof Error && 'code' in error ? (error as { code?: string }).code : undefined,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
    
    logError('🔴 Server failed to start', {
      error: errorDetails,
      mongoUri: MONGO_URI.replace(/\/\/.*@/, '//***:***@'), // Hide credentials
      port: PORT,
      environment: NODE_ENV
    });
    process.exit(1);
  }
};

start();