import { FastifyInstance } from 'fastify';
import { logRequest, logResponse } from './logger';

export const setupLoggerHooks = (server: FastifyInstance) => {
  server.addHook('onRequest', (request, reply, done) => {
    logRequest(`${request.method} ${request.url}`, {
      method: request.method,
      url: request.url,
      headers: request.headers,
    });
    done();
  });

  server.addHook('onResponse', (request, reply, done) => {
    const responseTime = Date.now() - (request as any).requestTime;
    logResponse(`${reply.statusCode} ${request.method} ${request.url}`, {
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      responseTime: `${responseTime}ms`,
    });
    done();
  });
};
