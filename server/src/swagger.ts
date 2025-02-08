import fastifySwagger, { SwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { NODE_ENV, PORT } from './common/config';

export const swaggerOptions = {
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

  export const registerSwagger = (server: FastifyInstance, swaggerOptions: FastifyRegisterOptions<SwaggerOptions>) => {
    server.register(fastifySwagger, swaggerOptions);
    server.register(fastifySwaggerUi, {
      routePrefix: '/documentation',
    });
  };