import mongoose, { Schema } from "mongoose";
import { IPlan } from "./plan.types";

const planSchema = new Schema<IPlan>({
  code: {
    type: String,
    required: true,
    unique: true,
    enum: ["free", "personal", "teams"]
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  max_users: {
    type: Number,
    default: null
  },
  features: [{
    type: String,
    required: true
  }],
  allowed_roles: [{
    type: String,
    required: true
  }],
  is_active: {
    type: Boolean,
    default: true
  }
});

planSchema.index({ code: 1 });

export default mongoose.model<IPlan>("Plan", planSchema);