import { PostlineService } from "./postline.service";
import { postlineSchema } from "./postline.schema";
export default async function postlineController(fastify) {
    const service = new PostlineService();
    fastify.get("/", {
        schema: postlineSchema.getAll,
    }, async (_request, reply) => {
        const postlines = await service.getAllPostlines();
        return reply.code(200).send(postlines);
    });
    fastify.get("/:id", async (request, reply) => {
        const postline = await service.getPostline(request.params.id);
        return reply.code(200).send(postline);
    });
    fastify.post("/", {
        schema: postlineSchema.create,
    }, async (request, reply) => {
        const postline = await service.createPostline(request.body);
        return reply.code(201).send(postline);
    });
    fastify.put("/:id", async (request, reply) => {
        const postline = await service.updatePostline(request.params.id, request.body);
        return reply.code(200).send(postline);
    });
    fastify.delete("/:id", async (request, reply) => {
        const result = await service.deletePostline(request.params.id);
        return reply.code(200).send(result);
    });
}
