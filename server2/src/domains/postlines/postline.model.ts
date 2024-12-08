import mongoose, { Schema } from "mongoose";
import { IPostline } from "./postline.types";

const postlineSchema = new Schema<IPostline>({
  postline_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPostline>("Postline", postlineSchema);
