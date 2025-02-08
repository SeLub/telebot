import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PlanService } from "./plan.service";
import { planSchema } from "./plan.schema";
import { IPlan } from "./plan.types";

export default async function planController(fastify: FastifyInstance) {
  const service = new PlanService();

  fastify.route({
    method: 'GET',
    url: '/',
    schema: planSchema.getAll,
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      const plans = await service.getAllPlans();
      return reply.code(200).send(plans);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: planSchema.getOne,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const plan = await service.getPlanById(request.params.id);
      return reply.code(200).send(plan);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: planSchema.create,
    handler: async (request: FastifyRequest<{ Body: Omit<IPlan, '_id'> }>, reply: FastifyReply) => {
      const plan = await service.createPlan(request.body);
      return reply.code(201).send(plan);
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: planSchema.update,
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<IPlan> }>, reply: FastifyReply) => {
      const plan = await service.updatePlan(request.params.id, request.body);
      return reply.code(200).send(plan);
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: planSchema.delete,
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await service.deletePlan(request.params.id);
      return reply.code(200).send(result);
    }
  });
}
