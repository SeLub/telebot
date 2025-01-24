import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors'; 
import { PORT, NODE_ENV } from './common/config';
import { logger } from './logger';
import { handleExit, handleUncaughtErrors } from './common/fatal';
import { connectDB } from './db/connection';
import MainRouter from './router';

const swaggerOptions = {
  openapi: {
    info: {
      title: 'PostUp API',
      description: 'PostUp Telegram auto-posting application API',
      version: '1.0.0',
    },
    tags: [
      { name: 'Subscriptions', description: 'Subscription management endpoints' },
      { name: 'Channels', description: 'Channel management endpoints' },
      { name: 'Bots', description: 'Bot management endpoints' },
      { name: 'Postlines', description: 'Postline management endpoints' },
      { name: 'Posts', description: 'Post management endpoints' }
    ],
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: `${NODE_ENV} server`,
      },
    ],
  },
};



export const createServer = (): FastifyInstance => {
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

    // Регистрируем плагин CORS
    server.register(fastifyCors, {
      origin: '*', // Разрешаем все источники, вы можете настроить его по необходимости
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
    });

  // Register Swagger
  server.register(fastifySwagger, swaggerOptions);
  server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
  });

  // Register routes
  server.register(MainRouter);

  return server;
};

const start = async () => {
  try {
    // Setup error handlers
    handleExit();
    handleUncaughtErrors();

    // Connect to database
    await connectDB();

    const server = createServer();

    await server.listen({ port: Number(PORT), host: '0.0.0.0' });
    logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
  } catch (error) {
    logger.error(error, 'Server failed to start');
    process.exit(1);
  }
};

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  start();
}

export default createServer;
