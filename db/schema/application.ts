import { model, Schema } from "mongoose";

export interface Application {
    appNumber: number;
    appName: string;
    appDescription: string;
    clientId: string;
    ownerFirstname: string;
    ownerLastname: string;
    redirectUrl: string;
    secret: string;
}

export const applicationSchema = new Schema<Application>({
    appNumber: { type: Number },
    appName: { type: String },
    appDescription: { type: String },
    clientId: { type: String, required: true },
    ownerFirstname: { type: String },
    ownerLastname: { type: String },
    redirectUrl: { type: String },
    secret: { type: String },
})