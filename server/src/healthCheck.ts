import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

export const registerHealthCheck = (server: FastifyInstance) => {
  server.get('/health', async (request, reply) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        server: 'running',
        database: dbStatus
      }
    });
  });
};
