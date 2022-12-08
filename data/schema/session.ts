import { Schema } from "mongoose";

export const sessionSchema = new Schema<Session>(
  {
    uid: { type: String },
    clientId: { type: String },
    scope: { type: String },
    ssid: { type: String },
    expireAt: { type: Date },
    accessId: { type: String },
  },
  { timestamps: true }
);
