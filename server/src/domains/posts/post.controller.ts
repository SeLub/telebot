import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PostService } from "./post.service";
import { postSchema } from "./post.schema";
import { IPostCreate, IPostUpdate } from "./post.types";

export default async function postController(fastify: FastifyInstance) {
  const service = new PostService();

  // Get all posts
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Posts'],
      summary: 'Get all posts',
      description: 'Retrieve all posts',
      response: postSchema.getAll.response
    },
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const posts = await service.getAllPosts();
      return reply.code(200).send(posts);
    }
  });

  // Get posts by postline
  fastify.route({
    method: 'GET',
    url: '/postline/:postlineId',
    schema: postSchema.getByPostline,
    handler: async (request: FastifyRequest<{ Params: { postlineId: string } }>, reply: FastifyReply) => {
      const posts = await service.getPostsByPostline(request.params.postlineId);
      return reply.code(200).send(posts);
    }
  });

  // Get single post
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: postSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const post = await service.getPost(request.params.id);
      return reply.code(200).send(post);
    }
  });

  // Create post
  fastify.route({
    method: 'POST',
    url: '/',
    schema: postSchema.create,
    handler: async (request: FastifyRequest<{ Body: IPostCreate }>, reply: FastifyReply) => {
      const post = await service.createPost(request.body);
      return reply.code(201).send(post);
    }
  });

  // Update post
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: postSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: IPostUpdate }>, reply: FastifyReply) => {
      const post = await service.updatePost(request.params.id, request.body);
      return reply.code(200).send(post);
    }
  });

  // Delete post
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: postSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deletePost(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
