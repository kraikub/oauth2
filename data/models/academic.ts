import { model, models } from "mongoose";
import { academicSchema } from "../schema/academic";

export const AcademicModel = models["Academic"] ||  model<Academic>('Academic', academicSchema, 'academics');