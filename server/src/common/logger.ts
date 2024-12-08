import { logger } from '../logger';

export const logErrDetails = ({ message = '', error = {}, additionalData = {} }) => {
  logger.error(error, message, additionalData);
};

export const logInfoDetails = ({ message = '', additionalData = {} }) => {
  logger.info(message, additionalData);
};
