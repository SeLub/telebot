import mongoose, { Schema } from "mongoose";
import { ISubscription } from "./subscription.types";

const subscriptionSchema = new Schema<ISubscription>({
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

export default mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
