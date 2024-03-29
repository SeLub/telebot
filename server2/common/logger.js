"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfoDetails = exports.logErrDetails = void 0;
const server_js_1 = __importDefault(require("../server.js"));
/**
 *
 * @param message
 * @param error
 * @param additionalData
 */
const logErrDetails = ({ message = "", error = {}, additionalData = {}, }) => {
    server_js_1.default.log.error(error, message, additionalData);
};
exports.logErrDetails = logErrDetails;
/**
 *
 * @param message
 * @param additionalData
 */
const logInfoDetails = ({ message = "", additionalData = {} }) => {
    server_js_1.default.log.info(message, additionalData);
};
exports.logInfoDetails = logInfoDetails;
