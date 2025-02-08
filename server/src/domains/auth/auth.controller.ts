import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "./auth.service";
import { authSchema } from "./auth.schema";
import { IAuthRegisterInput, IAuthLoginInput } from './auth.types';
import fastifyCookie from '@fastify/cookie';

export default async function authController(fastify: FastifyInstance) {
  const service = new AuthService();
  
  // Register cookie plugin
  await fastify.register(fastifyCookie);

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: authSchema.register,
    handler: async (request: FastifyRequest<{ Body: IAuthRegisterInput }>, reply: FastifyReply) => {
      const result = await service.register(request.body);
      return reply.code(201).send(result);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: authSchema.login,
    handler: async (request: FastifyRequest<{ Body: IAuthLoginInput }>, reply: FastifyReply) => {
      const result = await service.login(request.body);
      
      reply.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/auth/refresh',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });
      
      return reply.code(200).send(result);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/refresh',
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const refreshToken = request.cookies?.refreshToken;
      if (!refreshToken) {
        return reply.code(401).send({ message: 'Refresh token is required' });
      }
      const result = await service.refreshToken(refreshToken);
      
      reply.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/auth/refresh',
        maxAge: 30 * 24 * 60 * 60
      });
      
      return reply.code(200).send({ token: result.token });
    }
  });
}
