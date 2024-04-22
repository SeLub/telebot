"use strict";

const ApiGateway = require("moleculer-web");
require("dotenv").config();
const {
	ForbiddenError,
	UnAuthorizedError,
	ERR_NO_TOKEN,
	ERR_INVALID_TOKEN,
} = require("../lib/errors");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	/** @type {ApiSettingsSchema} More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html */
	settings: {
		// Exposed port
		port: process.env.PORT || 3000,

		// Exposed IP
		ip: "0.0.0.0",

		// Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
		use: [],

		routes: [
			{
				path: "/api",
				cors: {
					origin: [
						"http://0.0.0.0:3000/",
						"http://localhost:5173/",
						"http://localhost:5174/",
						`${process.env.FRONTEND_HOST}`,
					],
					methods: ["GET", "POST", "PUT", "DELETE"],
					credentials: false,
				},
				whitelist: ["**"],

				// Route-level Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
				use: [],

				// Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
				mergeParams: true,

				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: true,

				// The auto-alias feature allows you to declare your route alias directly in your services.
				// The gateway will dynamically build the full routes from service schema.
				autoAliases: true,

				/**
				 * Before call hook. You can check the request.
				 * @param {Context} ctx
				 * @param {Object} route
				 * @param {IncomingRequest} req
				 * @param {ServerResponse} res
				 * @param {Object} data
				 */
				//onBeforeCall(ctx, route, req, res) {
				//console.log("!!!!!!!!!!!!!!!!!!!!!!! onBeforeCall ", req);
				// Set request headers to context meta
				//ctx.meta.userAgent = req.headers["user-agent"];
				//if (req.$endpoint.action.auth == "required" && !user)
				// console.log(
				// 	"===>",
				// 	req.$endpoint.action.auth,
				// 	ctx.meta.user
				// );
				// if (req.$endpoint.action.auth && !ctx.meta.user) {
				// 	res.writeHead(403);
				// 	res.end();
				// 	return;
				// }
				//},

				/**
				 * After call hook. You can modify the data.
				 * @param {Context} ctx
				 * @param {Object} route
				 * @param {IncomingRequest} req
				 * @param {ServerResponse} res
				 * @param {Object} data
				onAfterCall(ctx, route, req, res, data) {
					// Async function which return with Promise
					return doSomething(ctx, res, data);
				}, */

				// Calling options. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Calling-options
				callOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB",
					},
					urlencoded: {
						extended: true,
						limit: "1MB",
					},
				},

				// Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
				mappingPolicy: "all", // Available values: "all", "restrict"

				// Enable/disable logging
				logging: true,
			},
		],

		// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
		log4XXResponses: false,
		// Logging the request parameters. Set to any log level to enable it. E.g. "info"
		logRequestParams: null,
		// Logging the response data. Set to any log level to enable it. E.g. "info"
		logResponseData: null,

		// Serve assets from "public" folder. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Serve-static-files
		assets: {
			folder: "public",

			// Options to `server-static` module
			options: {},
		},
	},

	methods: {
		/**
		 * Authorize the request
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		authorize(ctx, route, req) {
			let token;
			if (req.headers.authorization) {
				let type = req.headers.authorization.split(" ")[0];
				if (type === "Token" || type === "Bearer") {
					token = req.headers.authorization.split(" ")[1];
				}
			}
			console.log(
				"REQEST ",
				"settings.authorization=",
				req.$endpoint.service.settings.authorization,
				"actions.authorization=",
				req.$endpoint.action.authorization
			);
			if (
				req.$endpoint.service.settings.authorization &&
				(req.$endpoint.action.authorization === undefined ||
					req.$endpoint.action.authorization === true)
			) {
				if (!token) {
					return Promise.reject(new UnAuthorizedError(ERR_NO_TOKEN));
				}
				// Verify JWT token
				return ctx
					.call("users.resolveToken", { token })
					.then((user) => {
						if (!user)
							return Promise.reject(
								new UnAuthorizedError(ERR_INVALID_TOKEN)
							);

						ctx.meta.user = user;
					});
			}
		},
	},
};
