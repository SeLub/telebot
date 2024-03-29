/**
 * Creates:
 *  - Fastify Server
 *  - import and register Swagger Plugin
 *  - import and register {@link MainRouter}
 * @module Server
 * @category Server
 */
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
//import { PORT } from "./common/config.js";
import MainRouter from "./router.js";
//import { logger } from "./logger.js";
//import { checkAuth } from "./resources/logins/login.service.js";
const FASTIFY_PORT = Number(4000);
const SwaggerOpt = {
    openapi: {
        openapi: "3.0.0",
        info: {
            title: "Test swagger",
            description: "Testing the Fastify swagger API",
            version: "0.1.0",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Development server",
            },
        ],
    },
};
const server = fastify({
    ignoreTrailingSlash: true,
    //logger,
});
// server.register(fastifyRequestLogger)
/**
 * Register Swagger Plugin
 * @param SwaggerPlugin - Swagger Plugin instance
 * @param SwaggerOpt - Swagger JSON scheme Options
 */
server.register(fastifySwagger, SwaggerOpt);
server.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        },
    },
});
//server.addHook("preValidation", checkAuth);
server.addHook("preHandler", (req, reply, done) => {
    process.stdout.write(JSON.stringify(reply.request.params));
    if (req.body) {
        req.log.info({ body: req.body }, "parsed body");
    }
    done();
});
server.addHook("onRequest", (req, reply, done) => {
    process.stdout.write(JSON.stringify(reply.request.params));
    req.log.info({ url: req.raw.url, id: req.id, params: req.params, query: req.query }, "received request");
    done();
});
server.addHook("onResponse", (req, reply, done) => {
    req.log.info({
        url: req.raw.url, // add url to response as well for simple correlating
        statusCode: reply.raw.statusCode,
    }, "request completed");
    done();
});
/**
 * Register main Server Router
 * @param MainRouter - main Server`s Router
 */
// server.register(db);
server.register(MainRouter);
// const start = async () => {
//   try {
//     handleExit();
//     handleUncaughtErrors();
//     // Для проверки пункта 3 расскомментируйте здесь:
//     // throw Error('Oops!')
//     // Для проверки пункта 4 расскомментируйте здесь:
//     // Promise.reject(Error('Oops!'))
//     server.listen({ port: FASTIFY_PORT, host: "0.0.0.0" }, (err) => {
//       if (err) {
//         server.log.error(err);
//         process.exit(1);
//       }
//       server.log.info(`🚀  Fastify server running on `);
//     });
//   } catch (error) {
//     server.log.error(error);
//     process.exit(1);
//   }
// };
server.listen({ port: FASTIFY_PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`🚀  Fastify server running on ${address}`);
});
//start();
export default server;
