import { SubscriptionService } from "./subscription.service";
import { subscriptionSchema } from "./subscription.schema";
export default async function subscriptionController(fastify) {
    const service = new SubscriptionService();
    fastify.get("/", { schema: subscriptionSchema.getAll }, async (request, reply) => {
        const subscriptions = await service.getAllSubscriptions();
        return reply.code(200).send(subscriptions);
    });
    fastify.get("/:id", async (request, reply) => {
        const subscription = await service.getSubscription(request.params.id);
        return reply.code(200).send(subscription);
    });
    fastify.post("/", async (request, reply) => {
        const subscription = await service.createSubscription(request.body);
        return reply.code(201).send(subscription);
    });
    // Add other routes
}
