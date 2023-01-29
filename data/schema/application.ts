import { model, Schema } from "mongoose";

export const applicationSchema = new Schema<Application>(
  {
    appName: { type: String },
    appDescription: { type: String },
    appId: { type: String },
    appType: { type: String },
    clientId: { type: String, required: true },
    ownerId: { type: String },
    creatorName: { type: String },
    redirects: [
      {
        url: { type: String },
      },
    ],
    secret: { type: String },
    refId: { type: String },
    refType: { type: String },
  },
  { timestamps: true }
);
