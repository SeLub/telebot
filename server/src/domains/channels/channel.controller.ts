import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ChannelService } from "./channel.service";
import { channelSchema } from "./channel.schema";
import { IChannelCreate, IChannelUpdate } from "./channel.types";

export default async function channelController(fastify: FastifyInstance) {
  const service = new ChannelService();

  // Get all channels
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Channels'],
      summary: 'Get all channels',
      description: 'Retrieve all channels',
      response: channelSchema.getAll.response
    },
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const channels = await service.getAllChannels();
      return reply.code(200).send(channels);
    }
  });

  // Get single channel
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: channelSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const channel = await service.getChannel(request.params.id);
      return reply.code(200).send(channel);
    }
  });

  // Create channel
  fastify.route({
    method: 'POST',
    url: '/',
    schema: channelSchema.create,
    handler: async (request: FastifyRequest<{ Body: IChannelCreate }>, reply: FastifyReply) => {
      const channel = await service.createChannel(request.body);
      return reply.code(201).send(channel);
    }
  });

  // Update channel
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: channelSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: IChannelUpdate }>, reply: FastifyReply) => {
      const channel = await service.updateChannel(request.params.id, request.body);
      return reply.code(200).send(channel);
    }
  });

  // Delete channel
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: channelSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deleteChannel(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
