import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../common/config';
import { JWTPayload } from './auth.types';

export async function validateToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return reply.code(401).send({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    request.user = decoded;
  } catch (error) {
    return reply.code(401).send({ message: 'Invalid token' });
  }
}
