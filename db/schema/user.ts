import { Schema } from "mongoose";
import { PossibleEmptyField } from "../../scopes";
export interface User {
  stdId: string;
  stdCode: string;
  genderCode: string;
  genderTh: string;
  genderEn: string;
  nameTh: string;
  nameEn: string;
  birthDate: string;
  nationCode: string;
  nationNameTh: string;
  nationNameEn: string;
  religionTh: string;
  religionEn: string;
  phone: string;
  email: string;
  appQuota: number;
  uid: string;
  titleTh: string;
  titleEn: string;
  firstNameTh: string;
  middleNameTh: PossibleEmptyField;
  lastNameTh: string;
  firstNameEn: string;
  middleNameEn: PossibleEmptyField;
  lastNameEn: string;
  copenId: string;
  copenNameTh: string;
  copenNameEn: string;
  campusCode: string;
  campusNameTh: string;
  campusNameEn: string;
  facultyCode: string;
  facultyNameTh: string;
  facultyNameEn: string;
  departmentCode: string;
  departmentNameTh: string;
  departmentNameEn: string;
  majorCode: string;
  majorNameTh: string;
  majorNameEn: string;
  nationalityNameTh: string;
  nationalityNameEn: string;
  studentStatusCode: string;
  studentStatusNameTh: string;
  studentStatusNameEn: string;
  studentTypeCode: string;
  studentTypeNameTh: string;
  studentTypeNameEn: string;
  edulevelCode: string;
  edulevelNameTh: string;
  edulevelNameEn: string;
  studentYear: string;
  advisorId: string;
  advisorNameTh: string;
  advisorNameEn: string;
  positionTh: string;
}

export const userSchema = new Schema<User>({
  stdId: { type: String },
  stdCode: { type: String },
  genderCode: { type: String },
  genderTh: { type: String },
  genderEn: { type: String },
  nameTh: { type: String },
  nameEn: { type: String },
  birthDate: { type: String },
  nationCode: { type: String },
  nationNameTh: { type: String },
  nationNameEn: { type: String },
  religionTh: { type: String },
  religionEn: { type: String },
  phone: { type: String },
  email: { type: String },
  appQuota: { type: Number },
  uid: { type: String },
  titleTh: { type: String },
  titleEn: { type: String },
  firstNameTh: { type: String },
  middleNameTh: { type: String },
  lastNameTh: { type: String },
  firstNameEn: { type: String },
  middleNameEn: { type: String },
  lastNameEn: { type: String },
  copenId: { type: String },
  copenNameTh: { type: String },
  copenNameEn: { type: String },
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
  nationalityNameTh: { type: String },
  nationalityNameEn: { type: String },
  studentStatusCode: { type: String },
  studentStatusNameTh: { type: String },
  studentStatusNameEn: { type: String },
  studentTypeCode: { type: String },
  studentTypeNameTh: { type: String },
  studentTypeNameEn: { type: String },
  edulevelCode: { type: String },
  edulevelNameTh: { type: String },
  edulevelNameEn: { type: String },
  studentYear: { type: String },
  advisorId: { type: String },
  advisorNameTh: { type: String },
  advisorNameEn: { type: String },
  positionTh: { type: String },
});
