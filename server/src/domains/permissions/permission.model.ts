import mongoose, { Schema } from "mongoose";
import { IPermission } from "./permission.types";

const permissionSchema = new Schema<IPermission>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    required: true,
    enum: ['postline', 'bot', 'channel', 'user', 'system']
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'read', 'update', 'delete', 'manage', 'approve']
  }
});

permissionSchema.index({ code: 1 });
permissionSchema.index({ name: 1 });

export default mongoose.model<IPermission>("Permission", permissionSchema);
