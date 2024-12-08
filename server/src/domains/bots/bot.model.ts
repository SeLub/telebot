import mongoose, { Schema } from "mongoose";
import { IBot } from "./bot.types";

const botSchema = new Schema<IBot>({
  bot_id: {
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
  bot_token: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IBot>("Bot", botSchema);
