import { PostService } from "./post.service";
import { postSchema } from "./post.schema";
export default async function postController(fastify) {
    const service = new PostService();
    fastify.get("/", {
        schema: postSchema.getAll,
    }, async (_request, reply) => {
        const posts = await service.getAllPosts();
        return reply.code(200).send(posts);
    });
    fastify.get("/postline/:postlineId", async (request, reply) => {
        const posts = await service.getPostsByPostline(request.params.postlineId);
        return reply.code(200).send(posts);
    });
    fastify.get("/:id", async (request, reply) => {
        const post = await service.getPost(request.params.id);
        return reply.code(200).send(post);
    });
    fastify.post("/", {
        schema: postSchema.create,
    }, async (request, reply) => {
        const post = await service.createPost(request.body);
        return reply.code(201).send(post);
    });
    fastify.put("/:id", async (request, reply) => {
        const post = await service.updatePost(request.params.id, request.body);
        return reply.code(200).send(post);
    });
    fastify.delete("/:id", async (request, reply) => {
        const result = await service.deletePost(request.params.id);
        return reply.code(200).send(result);
    });
}
