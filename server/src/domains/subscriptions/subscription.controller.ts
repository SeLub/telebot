import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { SubscriptionService } from "./subscription.service";
import { subscriptionSchema } from "./subscription.schema";
import { ISubscriptionCreate, ISubscriptionUpdate } from "./subscription.types";

export default async function subscriptionController(fastify: FastifyInstance) {
  const service = new SubscriptionService();

  // Get all subscriptions
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Subscriptions'],
      summary: 'Get all subscriptions',
      description: 'Retrieve all subscriptions',
      response: subscriptionSchema.getAll.response
    },
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const subscriptions = await service.getAllSubscriptions();
      return reply.code(200).send(subscriptions);
    }
  });

  // Get single subscription
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: subscriptionSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const subscription = await service.getSubscription(request.params.id);
      return reply.code(200).send(subscription);
    }
  });

  // Create subscription
  fastify.route({
    method: 'POST',
    url: '/',
    schema: subscriptionSchema.create,
    handler: async (request: FastifyRequest<{ Body: ISubscriptionCreate }>, reply: FastifyReply) => {
      const subscription = await service.createSubscription(request.body);
      return reply.code(201).send(subscription);
    }
  });

  // Update subscription
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: subscriptionSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: ISubscriptionUpdate }>, reply: FastifyReply) => {
      const subscription = await service.updateSubscription(request.params.id, request.body);
      return reply.code(200).send(subscription);
    }
  });

  // Delete subscription
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: subscriptionSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deleteSubscription(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
