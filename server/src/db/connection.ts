import mongoose from 'mongoose';
import { MONGO_URI } from '../common/config';
import { logError, logInfo } from '../common/logger';

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

let isConnecting = false;
let currentRetry = 0;

export const connectDB = async (retryCount = 0): Promise<void> => {
  if (isConnecting) return;
  
  try {
    isConnecting = true;
    currentRetry = retryCount;

    logInfo('🟡 Attempting to connect to MongoDB...');

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnecting = false;
    currentRetry = 0;
    logInfo('🟢 MongoDB connected successfully');
  } catch (error: unknown) {
    isConnecting = false;

    if (!(error instanceof Error)) {
      logError('🔴 Unknown MongoDB error', { error });
      return;
    }

    const isConnectionRefused = error.message.includes('ECONNREFUSED');
    
    if (isConnectionRefused && retryCount < MAX_RETRIES) {
      logError('🔴 MongoDB is not connected', {
        attempt: `${retryCount + 1}/${MAX_RETRIES}`,
        nextRetryIn: `${RETRY_INTERVAL / 1000} seconds`,
      });

      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      return connectDB(retryCount + 1);
    }

    const errorMessage = isConnectionRefused
      ? '🔴 MongoDB connection failed after multiple attempts'
      : '🔴 MongoDB connection error';

    logError(errorMessage, {
      error: {
        message: error.message,
        type: error.name,
        details: isConnectionRefused 
          ? 'Please ensure MongoDB is running and accessible'
          : 'An unexpected database error occurred'
      }
    });

    if (process.env.NODE_ENV === 'development') {
      logInfo('⚠️ Starting server in development mode without database');
      return;
    }

    process.exit(1);
  }
};

export const closeDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    logInfo('🔵 Database connection closed');
  }
};

export const getDBStatus = (): string => {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
};

// Event listeners for connection status
mongoose.connection.on('disconnected', () => {
  if (!isConnecting) {
    logError('🔴 MongoDB disconnected', {
      status: 'disconnected',
      action: currentRetry < MAX_RETRIES ? 'Attempting to reconnect...' : 'Max retries reached'
    });
  }
});

mongoose.connection.on('connected', () => {
  logInfo('🟢 MongoDB connected');
});

mongoose.connection.on('error', (error: Error) => {
  if (!error.message.includes('ECONNREFUSED')) {
    logError('🔴 Unexpected MongoDB error', { 
      error: {
        message: error.message,
        type: error.name
      }
    });
  }
});
