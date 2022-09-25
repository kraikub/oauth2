import { MyKULoginResponse } from "../../types/myku/auth";
import { MyKUPersonalResponse } from "../../types/myku/student";

export const studentConverter = (
  uid: string,
  personal: MyKUPersonalResponse,
  authResponse: MyKULoginResponse
): Student => {
  const {
    stdId,
    nameEn,
    nameTh,
    genderCode,
    genderEn,
    genderTh,
    phone,
    email,
    attenedDate,
  } = personal.results.stdPersonalModel;
  const {
    studentStatusCode,
    studentStatusNameTh,
    studentStatusNameEn,
    studentTypeCode,
    studentTypeNameTh,
    studentTypeNameEn,
    edulevelCode,
    edulevelNameTh,
    edulevelNameEn,
  } = authResponse.user.student;
  return {
    uid,
    stdId,
    nameEn,
    nameTh,
    genderCode,
    genderEn,
    genderTh,
    phone,
    email,
    // joinYear will be your joined year in BC with last 2 digits.
    // ** This script only support until 2600 BC
    joinYear: new Date(attenedDate).getFullYear() + 543 - 2500,
    studentStatusCode,
    studentStatusNameTh,
    studentStatusNameEn,
    studentTypeCode,
    studentTypeNameTh,
    studentTypeNameEn,
    edulevelCode,
    edulevelNameTh,
    edulevelNameEn,
  };
};
