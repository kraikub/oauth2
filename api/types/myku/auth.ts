import { PossibleEmptyField } from "../../../scopes";

export interface MyKULoginResponse {
  code: string;
  message: string;
  accesstoken: string;
  renewtoken: string;
  user: {
    loginName: string;
    userType: string;
    idCode: string;
    titleTh: string;
    titleEn: string;
    firstNameTh: string;
    firstNameEn: string;
    middleNameTh: PossibleEmptyField;
    middleNameEn: PossibleEmptyField;
    lastNameTh: string;
    lastNameEn: string;
    avatar: string;
    gender: string;
    student: {
      loginName: string;
      stdId: string;
      stdCode: string;
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
      nationCode: string;
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
      email: string;
      mobileNo: string;
    };
  };
}

export interface MyKURenewTokenResponse {
  code: string;
  username: string;
  accesstoken: string;
}
