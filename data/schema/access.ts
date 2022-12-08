import { Schema } from "mongoose";

export const accessSchema = new Schema<Access>(
  {
    uid: { type: String },
    clientId: { type: String },
    accessId: { type: String},
  },
  { timestamps: true }
);
