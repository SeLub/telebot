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
  } catch (error) {
    logError('🔴 Server failed to start', { error });
    process.exit(1);
  }
};


start();