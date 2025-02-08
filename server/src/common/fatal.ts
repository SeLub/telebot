import { logger } from "./logger";

const errorHandler = (error: Error) => {
  logger.error(error, "Uncaught error");
  process.exit(1);
};

export const handleUncaughtErrors = () => {
  process.on("unhandledRejection", errorHandler);
  process.on("uncaughtException", errorHandler);
};

export const handleExit = () => {
  const exitHandler = () => {
    logger.info("Server is shutting down");
    process.exit(0);
  };

  process.on("SIGINT", exitHandler);
  process.on("SIGTERM", exitHandler);
};
