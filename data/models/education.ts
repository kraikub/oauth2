import { model, models } from "mongoose";
import { educationSchema } from "../schema/education";

export const EducationModel = models["Education"] ||  model<Education>('Education', educationSchema, 'educations');