import { Schema } from "mongoose";

export const userSchema = new Schema<User>(
  {
    appQuota: { type: Number },
    appOwned: { type: Number },
    signinSignature: { type: String },
    uid: { type: String },
    shouldUpdate: { type: Boolean },
    fullName: { type: String },
    type: { type: String },
    username: { type: String },
    profileImageUrl: { type: String },
    personalEmail: { type: String },
    orgId: { type: String },
    settings: {
      email: {
        signin: { type: Boolean },
        news: { type: Boolean },
      },
      tfa: {
        enable: { type: Boolean },
      },
    },
  },
  { timestamps: true }
);
