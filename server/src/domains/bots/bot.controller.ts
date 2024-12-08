import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { BotService } from "./bot.service";
import { botSchema } from "./bot.schema";
import { IBotCreate, IBotUpdate } from "./bot.types";

export default async function botController(fastify: FastifyInstance) {
  const service = new BotService();

  fastify.get(
    "/",
    {
      schema: botSchema.getAll,
    },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const bots = await service.getAllBots();
      return reply.code(200).send(bots);
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
      const bot = await service.getBot(request.params.id);
      return reply.code(200).send(bot);
    }
  );

  fastify.post(
    "/",
    {
      schema: botSchema.create,
    },
    async (
      request: FastifyRequest<{
        Body: IBotCreate;
      }>,
      reply: FastifyReply
    ) => {
      const bot = await service.createBot(request.body);
      return reply.code(201).send(bot);
    }
  );

  fastify.put(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: IBotUpdate;
      }>,
      reply: FastifyReply
    ) => {
      const bot = await service.updateBot(request.params.id, request.body);
      return reply.code(200).send(bot);
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
      const result = await service.deleteBot(request.params.id);
      return reply.code(200).send(result);
    }
  );
}
