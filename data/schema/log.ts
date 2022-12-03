import { Schema } from "mongoose";

export const logSchema = new Schema<Log>(
  {
    uid: { type: String },
    clientId: { type: String },
    scope: { type: String },
    timestamp: { type: Date },
  },
  { timestamps: true }
);
