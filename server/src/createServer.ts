import fastify from 'fastify';
import MainRouter from './router';
import { registerCors } from './cors';
import { registerSwagger } from './swagger';

const createServer = async () => {
  const server = fastify({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      },
    },
  });

  // Register CORS, Swagger and main router
  await registerCors(server);
  await registerSwagger(server);
  await server.register(MainRouter);

  return server;
};

export default createServer;
