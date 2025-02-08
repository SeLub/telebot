import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";
import { userSchema } from "./user.schema";
import { IUserCreate, IUserUpdate } from "./user.types";

export default async function userController(fastify: FastifyInstance) {
  const service = new UserService();

  fastify.route({
    method: 'GET',
    url: '/',
    schema: userSchema.getAll,
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const users = await service.getAllUsers();
      return reply.code(200).send(users);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: userSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const user = await service.getUserById(request.params.id);
      return reply.code(200).send(user);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: userSchema.create,
    handler: async (request: FastifyRequest<{ Body: IUserCreate }>, reply: FastifyReply) => {
      const user = await service.createUser(request.body);
      return reply.code(201).send(user);
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: userSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: IUserUpdate }>, reply: FastifyReply) => {
      const user = await service.updateUser(request.params.id, request.body);
      return reply.code(200).send(user);
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: userSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deleteUser(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
