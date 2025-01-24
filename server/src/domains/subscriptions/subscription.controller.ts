import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { SubscriptionService } from "./subscription.service";
import { subscriptionSchema } from "./subscription.schema";
import { ISubscriptionCreate, ISubscriptionUpdate } from "./subscription.types";

/**
 * Subscription Controller handles all subscription-related HTTP endpoints
 * @param fastify - Fastify instance for route registration
 * @category Controllers
 */
export default async function subscriptionController(fastify: FastifyInstance) {
  const service = new SubscriptionService();

  /**
   * GET /subscriptions
   * Retrieves all subscriptions from the database
   * @returns Array of subscription objects
   */
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

  /**
   * GET /subscriptions/:id
   * Retrieves a specific subscription by ID
   * @param id - Subscription identifier
   * @returns Single subscription object
   */
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: subscriptionSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const subscription = await service.getSubscription(request.params.id);
      return reply.code(200).send(subscription);
    }
  });

  /**
   * POST /subscriptions
   * Creates a new subscription
   * @param body - Subscription creation data
   * @returns Newly created subscription object
   */
  fastify.route({
    method: 'POST',
    url: '/',
    schema: subscriptionSchema.create,
    handler: async (request: FastifyRequest<{ Body: ISubscriptionCreate }>, reply: FastifyReply) => {
      const subscription = await service.createSubscription(request.body);
      return reply.code(201).send(subscription);
    }
  });

  /**
   * PUT /subscriptions/:id
   * Updates an existing subscription
   * @param id - Subscription identifier
   * @param body - Updated subscription data
   * @returns Updated subscription object
   */
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: subscriptionSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: ISubscriptionUpdate }>, reply: FastifyReply) => {
      const subscription = await service.updateSubscription(request.params.id, request.body);
      return reply.code(200).send(subscription);
    }
  });

  /**
   * DELETE /subscriptions/:id
   * Removes a subscription from the system
   * @param id - Subscription identifier
   * @returns Success message
   */
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

