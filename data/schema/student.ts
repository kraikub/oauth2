import { Schema } from "mongoose";

export const studentSchema = new Schema<Student>({
  uid: { type: String },
  stdId: { type: String },
  genderCode: { type: String },
  genderTh: { type: String },
  genderEn: { type: String },
  nameTh: { type: String },
  nameEn: { type: String },
  phone: { type: String },
  email: { type: String },
  joinYear: { type: Number },
  studentStatusCode: { type: String },
  studentStatusNameTh: { type: String },
  studentStatusNameEn: { type: String },
  studentTypeCode: { type: String },
  studentTypeNameTh: { type: String },
  studentTypeNameEn: { type: String },
  edulevelCode: { type: String },
  edulevelNameTh: { type: String },
  edulevelNameEn: { type: String },
}, { timestamps: true });
