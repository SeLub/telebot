import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../common/config';

interface JWTPayload {
  userId: string;
  subscriptionId: string;
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    request.user = decoded;
  } catch (error) {
    reply.code(401).send({ error: 'Authentication failed' });
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload;
  }
}
