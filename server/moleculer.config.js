"use strict";
const os = require("os");
//const { transports } = require("./helpers/logger");
const winston = require("winston");
const Sentry = require("winston-transport-sentry-node").default;
require("dotenv").config();
const SentryDSN = process.env.SENTRY_DSN || "";
const SentryEnvironment = process.env.SENTRY_ENV || "production";

const transports = [
	new winston.transports.Console({
		level: "info",
	}),
];

if (SentryDSN) {
	const sentryOptions = {
		sentry: {
			dsn: SentryDSN,
			environment: SentryEnvironment,
		},
		level: "error",
	};

	transports.push(new Sentry(sentryOptions));
}

const winstonLogger = winston.createLogger({
	// levels: myCustomLevels.levels,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf((msg) => {
			return `${msg.level}: ${msg.message}`;
		})
	),
	transports,
});

module.exports = {
	// Namespace of nodes to segment your nodes on the same network.
	namespace: "PostUp",
	// Unique node identifier. Must be unique in a namespace.
	nodeID: os.hostname().toLowerCase() + "-" + process.pid,
	// Custom metadata store. Store here what you want. Accessing: `this.broker.metadata`
	metadata: {},
	logger: {
		type: "Winston",
		options: {
			level: "info",
			winston: winstonLogger,
		},
	},

	// Enable action & event parameter validation. More info: https://moleculer.services/docs/0.14/validating.html
	validator: true,
};
