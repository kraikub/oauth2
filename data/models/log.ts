import { model, models } from "mongoose";
import { logSchema } from "../schema/log";

export const LogModel = models["Log"] ||  model<Log>('Log', logSchema, 'logs');