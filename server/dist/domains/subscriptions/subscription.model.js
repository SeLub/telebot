import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new Schema({
    subscription_id: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
        enum: ["free", "premium"],
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
});
export default mongoose.model("Subscription", subscriptionSchema);
