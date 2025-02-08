import { FastifyInstance } from 'fastify';
import { getDBStatus } from './db/connection';

export default async function healthController(fastify: FastifyInstance) {
    fastify.route({
      method: 'GET',
      url: '/',
      schema: {
        tags: ['Health'],
        description: 'Health check endpoint',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              timestamp: { type: 'string' },
              services: {
                type: 'object',
                properties: {
                  server: { type: 'string' },
                  database: { type: 'string' }
                }
              }
            }
          }
        }
      },
      handler: async (request, reply) => {
        reply.send({
          status: 'ok',
          timestamp: new Date().toISOString(),
          services: {
            server: 'running',
            database: getDBStatus()
          }
        });
      }
    });
  }
  
