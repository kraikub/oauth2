import { Schema } from "mongoose";

export const educationSchema = new Schema<Education>({
  uid: { type: String },
  stdId: { type: String },
  stdCode: { type: String },
  index: { type: Number },
  campusCode: { type: String },
  campusNameTh: { type: String },
  campusNameEn: { type: String },
  facultyCode: { type: String },
  facultyNameTh: { type: String },
  facultyNameEn: { type: String },
  departmentCode: { type: String },
  departmentNameTh: { type: String },
  departmentNameEn: { type: String },
  majorCode: { type: String },
  majorNameTh: { type: String },
  majorNameEn: { type: String },
  teacherName: { type: String },
  teacherNameEn: { type: String },
  attenedDate: { type: String },
  copenId: { type: String },
}, { timestamps: true });
