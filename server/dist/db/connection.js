import mongoose from "mongoose";
import { logger } from "../logger";
import { MONGO_URI } from "../common/config";
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info("MongoDB connected successfully");
    }
    catch (error) {
        logger.error(error, "MongoDB connection error");
        process.exit(1);
    }
};
mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
});
