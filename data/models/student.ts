import { model, models } from "mongoose";
import { studentSchema } from "../schema/student";

export const StudentModel = models["Student"] ||  model<Student>('Student', studentSchema, 'students');