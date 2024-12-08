import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PostService } from "./post.service";
import { postSchema } from "./post.schema";
import { IPostCreate, IPostUpdate } from "./post.types";

export default async function postController(fastify: FastifyInstance) {
  const service = new PostService();

  fastify.get(
    "/",
    {
      schema: postSchema.getAll,
    },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const posts = await service.getAllPosts();
      return reply.code(200).send(posts);
    }
  );

  fastify.get(
    "/postline/:postlineId",
    async (
      request: FastifyRequest<{
        Params: { postlineId: string };
      }>,
      reply: FastifyReply
    ) => {
      const posts = await service.getPostsByPostline(request.params.postlineId);
      return reply.code(200).send(posts);
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
      const post = await service.getPost(request.params.id);
      return reply.code(200).send(post);
    }
  );

  fastify.post(
    "/",
    {
      schema: postSchema.create,
    },
    async (
      request: FastifyRequest<{
        Body: IPostCreate;
      }>,
      reply: FastifyReply
    ) => {
      const post = await service.createPost(request.body);
      return reply.code(201).send(post);
    }
  );

  fastify.put(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: IPostUpdate;
      }>,
      reply: FastifyReply
    ) => {
      const post = await service.updatePost(request.params.id, request.body);
      return reply.code(200).send(post);
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
      const result = await service.deletePost(request.params.id);
      return reply.code(200).send(result);
    }
  );
}
