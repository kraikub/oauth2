import { model, models } from "mongoose";
import { gradeSchema } from "../schema/grade";

export const GradeModel = models["Grade"] ||  model<Grade>('Grade', gradeSchema, 'grades');