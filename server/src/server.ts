import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';
import createServer from './createServer';
import { registerHealthCheck } from './healthCheck';
import { registerCors } from './cors';
import { registerSwagger , swaggerOptions } from './swagger';
import { handleExit, handleUncaughtErrors } from './errorHandlers';
import { logError, logInfo } from './common/logger';
import { PORT, NODE_ENV, MONGO_URI } from './common/config';


const start = async () => {
  try {
    // Setup error handlers
    handleExit();
    handleUncaughtErrors();

    // Connect to database
    await mongoose.connect(MONGO_URI);
    logInfo('🟢 MongoDB connected successfully');

    const server: FastifyInstance = createServer();

    // Register CORS, Swagger, and Health Check
    registerCors(server);
    registerSwagger(server, swaggerOptions); // Pass the correctly typed options
    registerHealthCheck(server);

    await server.listen({ port: Number(PORT), host: '0.0.0.0' });
    logInfo(`🟢 Server running on port ${PORT} in ${NODE_ENV} mode`);
  } catch (error) {
    logError('🔴 Server failed to start', { error });
    process.exit(1);
  }
};

// Start server
start();