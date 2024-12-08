import { BotService } from "./bot.service";
import { botSchema } from "./bot.schema";
export default async function botController(fastify) {
    const service = new BotService();
    fastify.get("/", {
        schema: botSchema.getAll,
    }, async (_request, reply) => {
        const bots = await service.getAllBots();
        return reply.code(200).send(bots);
    });
    fastify.get("/:id", async (request, reply) => {
        const bot = await service.getBot(request.params.id);
        return reply.code(200).send(bot);
    });
    fastify.post("/", {
        schema: botSchema.create,
    }, async (request, reply) => {
        const bot = await service.createBot(request.body);
        return reply.code(201).send(bot);
    });
    fastify.put("/:id", async (request, reply) => {
        const bot = await service.updateBot(request.params.id, request.body);
        return reply.code(200).send(bot);
    });
    fastify.delete("/:id", async (request, reply) => {
        const result = await service.deleteBot(request.params.id);
        return reply.code(200).send(result);
    });
}
