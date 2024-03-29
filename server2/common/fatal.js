"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleExit = exports.handleUncaughtErrors = void 0;
const logger_js_1 = require("./logger.js");
/**
 *
 * @param err
 */
function errorHandler(err) {
    (0, logger_js_1.logErrDetails)({
        error: err,
        message: "Error occurred in REST Service Fastify server!",
    });
}
/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
const handleUncaughtErrors = () => {
    process.on("unhandledRejection", errorHandler);
    process.on("uncaughtException", errorHandler);
};
exports.handleUncaughtErrors = handleUncaughtErrors;
/**
 *
 */
const handleExit = () => {
    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
        process.exit(0);
    });
    process.on("exit", () => {
        process.exit(0);
    });
};
exports.handleExit = handleExit;
