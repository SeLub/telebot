import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:pass@localhost:27017/postup?authSource=admin';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const LOGGING_ENABLED = process.env.LOGGING_ENABLED === 'false' || true;
