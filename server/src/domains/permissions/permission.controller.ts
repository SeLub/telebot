import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PermissionService } from "./permission.service";
import { permissionSchema } from "./permission.schema";
import { IPermissionCreate, IPermissionUpdate } from "./permission.types";

export default async function permissionController(fastify: FastifyInstance) {
  const service = new PermissionService();

  fastify.route({
    method: 'GET',
    url: '/',
    schema: permissionSchema.getAll,
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const permissions = await service.getAllPermissions();
      return reply.code(200).send(permissions);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: permissionSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const permission = await service.getPermissionById(request.params.id);
      return reply.code(200).send(permission);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: permissionSchema.create,
    handler: async (request: FastifyRequest<{ Body: IPermissionCreate }>, reply: FastifyReply) => {
      const permission = await service.createPermission(request.body);
      return reply.code(201).send(permission);
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: permissionSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: IPermissionUpdate }>, reply: FastifyReply) => {
      const permission = await service.updatePermission(request.params.id, request.body);
      return reply.code(200).send(permission);
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: permissionSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deletePermission(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
