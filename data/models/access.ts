import { accessSchema } from './../schema/access';
import { model, models } from "mongoose";

export const AccessModel = models["Access"] ||  model<Access>('Access', accessSchema, 'accesses');