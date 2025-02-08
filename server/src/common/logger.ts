// src/logger.ts
import { Logger, Level, pino } from "pino";
import { LOG_LEVEL } from "./config";

const logLevel = LOG_LEVEL || "info";

// Pretty printing configuration
const prettyTransport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: "SYS:standard",
    customLevels: {
      request: 30,
      response: 30
    },
    customColors: 'request:green,response:yellow,error:red,info:blue',
    messageFormat: '{if error}🔴 {end}{if request}🟢 {end}{if response}🟡 {end}{if info}🔵 {end}{msg}',
  }
};

// Configure transports based on environment
const transportTargets = process.env.NODE_ENV === 'production' 
  ? [
      prettyTransport,
      {
        target: "pino/file",
        options: { destination: "./logs/full.log", mkdir: true },
      },
      {
        target: "pino/file",
        options: { destination: "./logs/error.log", mkdir: true, level: 'error' },
      },
    ]
  : [prettyTransport];

// Create the logger instance
export const logger: Logger = pino({
  level: logLevel as Level,
  transport: {
    targets: transportTargets
  }
});

// Helper methods for different log types
export const logRequest = (msg: string, obj?: object) => 
  logger.info({ type: 'request', ...obj }, msg);

export const logResponse = (msg: string, obj?: object) => 
  logger.info({ type: 'response', ...obj }, msg);

export const logError = (msg: string, obj?: object) => 
  logger.error({ type: 'error', ...obj }, msg);

export const logInfo = (msg: string, obj?: object) => 
  logger.info({ type: 'info', ...obj }, msg);
