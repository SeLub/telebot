import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ChannelService } from "./channel.service";
import { channelSchema } from "./channel.schema";
import { IChannelCreate, IChannelUpdate } from "./channel.types";

export default async function channelController(fastify: FastifyInstance) {
  const service = new ChannelService();

  fastify.get(
    "/",
    {
      schema: channelSchema.getAll,
    },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const channels = await service.getAllChannels();
      return reply.code(200).send(channels);
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
      const channel = await service.getChannel(request.params.id);
      return reply.code(200).send(channel);
    }
  );

  fastify.post(
    "/",
    {
      schema: channelSchema.create,
    },
    async (
      request: FastifyRequest<{
        Body: IChannelCreate;
      }>,
      reply: FastifyReply
    ) => {
      const channel = await service.createChannel(request.body);
      return reply.code(201).send(channel);
    }
  );

  fastify.put(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: IChannelUpdate;
      }>,
      reply: FastifyReply
    ) => {
      const channel = await service.updateChannel(
        request.params.id,
        request.body
      );
      return reply.code(200).send(channel);
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
      const result = await service.deleteChannel(request.params.id);
      return reply.code(200).send(result);
    }
  );
}
