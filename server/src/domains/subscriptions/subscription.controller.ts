import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { SubscriptionService } from "./subscription.service";
import { subscriptionSchema } from "./subscription.schema";
import { ISubscriptionCreate, ISubscriptionUpdate } from "./subscription.types";

export default async function subscriptionController(fastify: FastifyInstance) {
  const service = new SubscriptionService();

  fastify.get(
    "/",
    { schema: subscriptionSchema.getAll },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const subscriptions = await service.getAllSubscriptions();
      return reply.code(200).send(subscriptions);
    }
  );

  fastify.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const subscription = await service.getSubscription(request.params.id);
      return reply.code(200).send(subscription);
    }
  );

  fastify.post(
    "/",
    async (
      request: FastifyRequest<{ Body: ISubscriptionCreate }>,
      reply: FastifyReply
    ) => {
      const subscription = await service.createSubscription(request.body);
      return reply.code(201).send(subscription);
    }
  );

  // Add other routes
}
