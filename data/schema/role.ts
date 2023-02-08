import { Schema } from "mongoose";

export const roleSchema = new Schema<Role>(
  {
    roleId: { type: String },
    roleName: { type: String },
    roleType: { type: String },
    priority: { type: Number },
    roleRef: { type: String },
    userRef: { type: String },
    data: { type: Schema.Types.Mixed },

  },
  { timestamps: true, strict: false }
);

export const rolePrototypeSchema = new Schema<RolePrototype>(
  {
    roleName: { type: String },
    roleType: { type: String },
    priority: { type: Number },
    data: { type: Schema.Types.Mixed },

  },
  { timestamps: true, strict: false }
);
