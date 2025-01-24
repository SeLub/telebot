import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PostlineService } from "./postline.service";
import { postlineSchema } from "./postline.schema";
import { IPostlineCreate, IPostlineUpdate } from "./postline.types";

export default async function postlineController(fastify: FastifyInstance) {
  const service = new PostlineService();

  // Get all postlines
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Postlines'],
      summary: 'Get all postlines',
      description: 'Retrieve all postlines',
      response: postlineSchema.getAll.response
    },
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const postlines = await service.getAllPostlines();
      return reply.code(200).send(postlines);
    }
  });

  // Get single postline
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: postlineSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const postline = await service.getPostline(request.params.id);
      return reply.code(200).send(postline);
    }
  });

  // Create postline
  fastify.route({
    method: 'POST',
    url: '/',
    schema: postlineSchema.create,
    handler: async (request: FastifyRequest<{ Body: IPostlineCreate }>, reply: FastifyReply) => {
      const postline = await service.createPostline(request.body);
      return reply.code(201).send(postline);
    }
  });

  // Update postline
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: postlineSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: IPostlineUpdate }>, reply: FastifyReply) => {
      const postline = await service.updatePostline(request.params.id, request.body);
      return reply.code(200).send(postline);
    }
  });

  // Delete postline
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: postlineSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deletePostline(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
