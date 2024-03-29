import { getUsersOpts } from "./user.options.js";
export default async function UserRouter(fastify) {
    fastify.get("/ok", getUsersOpts, async (_request, reply) => {
        await reply.code(200).send("It`s OK");
    });
}
