import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getUsersOpts } from "./user.options.js";

export default async function UserRouter(fastify: FastifyInstance) {
  fastify.get(
    "/ok",
    getUsersOpts,
    async (_request: FastifyRequest, reply: FastifyReply) => {
      await reply.code(200).send("It`s OK");
    }
  );
}
