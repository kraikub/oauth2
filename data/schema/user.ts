import { Schema } from "mongoose";

export const userSchema = new Schema<User>(
  {
    appQuota: { type: Number },
    appOwned: { type: Number },
    signinSignature: { type: String },
    uid: { type: String },
    shouldUpdate: { type: Boolean },
    profileImageUrl: { type: String },
    universityEmail: { type: String },
    personalEmail: { type: String },
  },
  { timestamps: true }
);
