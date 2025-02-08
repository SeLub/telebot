import mongoose, { Schema } from "mongoose";
import { IRole } from "./role.types";

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
  },
  permissions: [{
    type: String,
    required: true,
    enum: [
      'postline:create', 'postline:read', 'postline:update', 'postline:delete', 'postline:approve',
      'bot:create', 'bot:read', 'bot:update', 'bot:delete', 'bot:approve',
      'channel:create', 'channel:read', 'channel:update', 'channel:delete', 'channel:approve',
      'user:manage'
    ]
  }],
  subscription_type: {
    type: String,
    required: true,
    enum: ['free', 'personal', 'teams']
  }
});

// Drop any existing indexes and create only the compound index
roleSchema.index({ name: 1, subscription_type: 1 }, { unique: true });

export default mongoose.model<IRole>("Role", roleSchema);