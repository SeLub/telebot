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

import { FastifyInstance } from "fastify";
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
export default async function MainRouter(fastify: FastifyInstance) {
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
    decorateReply: false,
  });

  fastify.register(subscriptionController, { 
    prefix: "/subscriptions",
    schema: { tags: ['Subscriptions'] }
  });

  fastify.register(channelController, { 
    prefix: "/channels",
    schema: { tags: ['Channels'] }
  });

  fastify.register(botController, { 
    prefix: "/bots",
    schema: { tags: ['Bots'] }
  });

  fastify.register(postlineController, { 
    prefix: "/postlines",
    schema: { tags: ['Postlines'] }
  });

  fastify.register(postController, { 
    prefix: "/posts",
    schema: { tags: ['Posts'] }
  });
}

