import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PostlineService } from "./postline.service";
import { postlineSchema } from "./postline.schema";
import { IPostlineCreate, IPostlineUpdate } from "./postline.types";

export default async function postlineController(fastify: FastifyInstance) {
  const service = new PostlineService();

  fastify.get(
    "/",
    {
      schema: postlineSchema.getAll,
    },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const postlines = await service.getAllPostlines();
      return reply.code(200).send(postlines);
    }
  );

  fastify.get(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
      }>,
      reply: FastifyReply
    ) => {
      const postline = await service.getPostline(request.params.id);
      return reply.code(200).send(postline);
    }
  );

  fastify.post(
    "/",
    {
      schema: postlineSchema.create,
    },
    async (
      request: FastifyRequest<{
        Body: IPostlineCreate;
      }>,
      reply: FastifyReply
    ) => {
      const postline = await service.createPostline(request.body);
      return reply.code(201).send(postline);
    }
  );

  fastify.put(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: IPostlineUpdate;
      }>,
      reply: FastifyReply
    ) => {
      const postline = await service.updatePostline(
        request.params.id,
        request.body
      );
      return reply.code(200).send(postline);
    }
  );

  fastify.delete(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
      }>,
      reply: FastifyReply
    ) => {
      const result = await service.deletePostline(request.params.id);
      return reply.code(200).send(result);
    }
  );
}
