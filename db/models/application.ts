import { model } from "mongoose";
import { Application, applicationSchema } from "../schema/application";

export const ApplicationModel = model<Application>('Application', applicationSchema, 'applications');