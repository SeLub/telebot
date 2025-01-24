import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { BotService } from "./bot.service";
import { botSchema } from "./bot.schema";
import { IBotCreate, IBotUpdate } from "./bot.types";

export default async function botController(fastify: FastifyInstance) {
  const service = new BotService();

  // Get all bots
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Bots'],
      summary: 'Get all bots',
      description: 'Retrieve all registered Telegram bots',
      response: botSchema.getAll.response
    },
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const bots = await service.getAllBots();
      return reply.code(200).send(bots);
    }
  });

  // Get single bot
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      tags: ['Bots'],
      summary: 'Get bot by ID',
      description: 'Get a specific Telegram bot by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Bot ID' }
        }
      },
      response: {
        200: botSchema.getAll.response[200].items
      }
    },
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const bot = await service.getBot(request.params.id);
      return reply.code(200).send(bot);
    }
  });

  // Create bot
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['Bots'],
      summary: 'Create new bot',
      description: 'Create a new Telegram bot',
      body: botSchema.create.body,
      response: {
        201: botSchema.getAll.response[200].items
      }
    },
    handler: async (request: FastifyRequest<{ Body: IBotCreate }>, reply: FastifyReply) => {
      const bot = await service.createBot(request.body);
      return reply.code(201).send(bot);
    }
  });

  // Update bot
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['Bots'],
      summary: 'Update bot',
      description: 'Update an existing Telegram bot',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Bot ID' }
        }
      },
      body: botSchema.create.body,
      response: {
        200: botSchema.getAll.response[200].items
      }
    },
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: IBotUpdate }>, reply: FastifyReply) => {
      const bot = await service.updateBot(request.params.id, request.body);
      return reply.code(200).send(bot);
    }
  });

  // Delete bot
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['Bots'],
      summary: 'Delete bot',
      description: 'Delete a Telegram bot',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Bot ID' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deleteBot(request.params.id);
      return reply.code(200).send(result);
    }
  });
}

