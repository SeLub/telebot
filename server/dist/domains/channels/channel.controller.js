import { ChannelService } from "./channel.service";
import { channelSchema } from "./channel.schema";
export default async function channelController(fastify) {
    const service = new ChannelService();
    fastify.get("/", {
        schema: channelSchema.getAll,
    }, async (_request, reply) => {
        const channels = await service.getAllChannels();
        return reply.code(200).send(channels);
    });
    fastify.get("/:id", async (request, reply) => {
        const channel = await service.getChannel(request.params.id);
        return reply.code(200).send(channel);
    });
    fastify.post("/", {
        schema: channelSchema.create,
    }, async (request, reply) => {
        const channel = await service.createChannel(request.body);
        return reply.code(201).send(channel);
    });
    fastify.put("/:id", async (request, reply) => {
        const channel = await service.updateChannel(request.params.id, request.body);
        return reply.code(200).send(channel);
    });
    fastify.delete("/:id", async (request, reply) => {
        const result = await service.deleteChannel(request.params.id);
        return reply.code(200).send(result);
    });
}
