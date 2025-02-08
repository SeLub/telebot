import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export const registerCors = async (server: FastifyInstance) => {
  server.register(fastifyCors, {
    origin: '*', // Allow all origins, you can configure it as needed
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
};
