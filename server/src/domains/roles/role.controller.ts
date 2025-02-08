import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { RoleService } from "./role.service";
import { roleSchema } from "./role.schema";
import { IRoleCreate, IRoleUpdate } from "./role.types";

export default async function roleController(fastify: FastifyInstance) {
  const service = new RoleService();

  fastify.route({
    method: 'GET',
    url: '/',
    schema: roleSchema.getAll,
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const roles = await service.getAllRoles();
      return reply.code(200).send(roles);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: roleSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const role = await service.getRoleById(request.params.id);
      return reply.code(200).send(role);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: roleSchema.create,
    handler: async (request: FastifyRequest<{ Body: IRoleCreate }>, reply: FastifyReply) => {
      const role = await service.createRole(request.body);
      return reply.code(201).send(role);
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: roleSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: IRoleUpdate }>, reply: FastifyReply) => {
      const role = await service.updateRole(request.params.id, request.body);
      return reply.code(200).send(role);
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: roleSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deleteRole(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
