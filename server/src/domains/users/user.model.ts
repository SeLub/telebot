import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.types";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  role_ids: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
  }],
  refresh_token_hash: {
    type: String,
  },
  last_login: {
    type: Date,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

// Index for quick email lookups
userSchema.index({ email: 1 });

// Update the updated_at timestamp before saving
userSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<IUser>("User", userSchema);
