import { sessionSchema } from './../schema/session';
import { model, models } from "mongoose";

export const SessionModel = models["Session"] ||  model<Session>('Session', sessionSchema, 'sessions');