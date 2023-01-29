import { rolePrototypeSchema } from "./role";
import { Schema } from "mongoose";

export const organizationSchema = new Schema<Organization>(
  {
    orgId: { type: String },
    orgName: { type: String },
    orgUsername: { type: String },
    owner: { type: String },
    appOwned: { type: Number },
    appQuota: { type: Number },
    availableRoles: [{ type: rolePrototypeSchema }],
  },
  { timestamps: true }
);
