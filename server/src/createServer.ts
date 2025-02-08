import fastify from 'fastify';
import MainRouter from './router';

const createServer = () => {
  const server = fastify({
    logger: true,
  });

  // Register main router
  server.register(MainRouter);

  return server;
};

export default createServer;
