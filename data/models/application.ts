import { model, models } from "mongoose";
import { applicationSchema } from "../schema/application";

export const ApplicationModel = models["Application"] ||  model<Application>('Application', applicationSchema, 'applications');