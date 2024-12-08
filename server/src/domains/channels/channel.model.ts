import mongoose, { Schema } from "mongoose";
import { IChannel } from "./channel.types";

const channelSchema = new Schema<IChannel>({
  channel_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  logo_image: String,
  description: String,
  members_count: {
    type: Number,
    default: 0,
  },
  language: {
    type: String,
    default: "en",
  },
  user_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IChannel>("Channel", channelSchema);
