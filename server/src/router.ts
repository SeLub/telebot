/**
 * Main Server Router imports:
 *  - {@link SubscriptionController}
 *  - {@link ChannelController}
 *  - {@link BotController}
 *  - {@link PostlineController}
 *  - {@link PostController}
 *  - {@link UserController}
 *  - {@link RoleController}
 *  - {@link PermissionController}
 *  - {@link HealthController}
 *  - {@link AuthController}
 * 
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
import healthController from "./healthCheck";
import userController from './domains/users/user.controller';
import roleController from './domains/roles/role.controller';
import permissionController from './domains/permissions/permission.controller';
import planController from './domains/plans/plan.controller';
import authController from './domains/auth/auth.controller';


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

  fastify.register(healthController, { 
    prefix: "/health",
    schema: { tags: ['Health'] }
  });

  fastify.register(userController, { 
    prefix: "/users",
    schema: { tags: ['Users'] }
  });

  fastify.register(roleController, { 
    prefix: "/roles",
    schema: { tags: ['Roles'] }
  });

  fastify.register(permissionController, {
    prefix: "/permissions",
    schema: { tags: ['Permissions'] }
  });

  fastify.register(planController, {
    prefix: "/plans",
    schema: { tags: ['Plans'] }
  });

  fastify.register(authController, {
    prefix: "/auth",
    schema: { tags: ['Auth'] }
  });
}
