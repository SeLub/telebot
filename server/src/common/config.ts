import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:pass@localhost:27017/postup?authSource=admin';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const LOGGING_ENABLED = process.env.LOGGING_ENABLED === 'false' || true;

// Add to existing config
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const JWT_ACCESS_EXPIRES = '30m';
export const JWT_REFRESH_EXPIRES = '30d';
