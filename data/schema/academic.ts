import { Schema } from "mongoose";

export const academicSchema = new Schema<Academic>(
  {
    uid: { type: String },
    year: { type: String },
    gpa: { type: Number },
    totalCredit: { type: Number },
    hash: { type: String },
  },
  { timestamps: true }
);
