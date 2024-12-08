/**
 * Main Server Router imports:
 *  - {@link SubscriptionController}
 *  - {@link ChannelController}
 *  - {@link BotController}
 *  - {@link PostlineController}
 *  - {@link PostController}
 *
 * and register them in Server.
 *
 * @module MainRouter
 * @category Server
 */
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import subscriptionController from "./domains/subscriptions/subscription.controller";
import channelController from "./domains/channels/channel.controller";
import botController from "./domains/bots/bot.controller";
import postlineController from "./domains/postlines/postline.controller";
import postController from "./domains/posts/post.controller";
/**
 * Main server Router.
 * Registers static file serving and all domain controllers
 * @param fastify - Fastify server instance. Returned by the core fastify() method.
 * @category Server
 */
export default async function MainRouter(fastify) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // Register static file serving for documentation
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, "../doc"),
        prefix: "/static",
    });
    // Second plugin for additional documentation
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, "../docs"),
        prefix: "/docs",
        decorateReply: false, // the reply decorator has been added by the first plugin registration
    });
    /** Register Subscription Controller
     * @param subscriptionController - {@link SubscriptionController}
     */
    fastify.register(subscriptionController, { prefix: "/subscriptions" });
    /** Register Channel Controller
     * @param channelController - {@link ChannelController}
     */
    fastify.register(channelController, { prefix: "/channels" });
    /** Register Bot Controller
     * @param botController - {@link BotController}
     */
    fastify.register(botController, { prefix: "/bots" });
    /** Register Postline Controller
     * @param postlineController - {@link PostlineController}
     */
    fastify.register(postlineController, { prefix: "/postlines" });
    /** Register Post Controller
     * @param postController - {@link PostController}
     */
    fastify.register(postController, { prefix: "/posts" });
}
