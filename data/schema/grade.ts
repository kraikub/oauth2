import { Schema } from "mongoose";

export const gradeSchema = new Schema<Grade>(
  {
    uid: { type: String },
    stdCode: { type: String },
    subjectNameTh: { type: String },
    subjectNameEn: { type: String },
    credit: { type: Number },
    grade: { type: String },
    registerationYear: { type: Number },
    registerationSemester: { type: Number },
    academicHash: { type: String },
  },
  { timestamps: true }
);
