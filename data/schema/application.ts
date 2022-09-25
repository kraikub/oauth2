import { model, Schema } from "mongoose";

export const applicationSchema = new Schema<Application>({
    appName: { type: String },
    appDescription: { type: String },
    appType: { type: String },
    clientId: { type: String, required: true },
    ownerId: { type: String },
    creatorName: { type: String },
    callbackUrl: { type: String },
    devCallbackUrl: { type: String },
    secret: { type: String },
}, { timestamps: true })