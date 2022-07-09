import { PossibleEmptyField } from "../../scopes/student";

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

export interface MyKUPersonalResponse {
  code: string;
  message: string;
  results: {
    stdPersonalModel: {
      stdId: string;
      idCardCode: string; // do not leak this field
      passport_no: PossibleEmptyField;
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
      fatherPersonIdCode: string;
      fatherNameTh: string;
      fatherNameEn: string;
      fatherNationNameTh: string;
      fatherNationNameEn: string;
      fatherReligionTh: string;
      fatherReligionEn: string;
      fatherPhone: string;
      fatherEmail: PossibleEmptyField;
      motherPersonIdCode: string;
      motherNameTh: string;
      motherNameEn: string;
      motherNationNameTh: string;
      motherNationNameEn: string;
      motherReligionTh: string;
      motherReligionEn: string;
      motherPhone: string;
      motherEmail: PossibleEmptyField;
      attenedDate: string;
      entranceTh: PossibleEmptyField;
      entranceEn: PossibleEmptyField;
      projectName: string;
      authWelfare: string;
      libBarcode: string;
      deformTh: PossibleEmptyField;
      deformEn: PossibleEmptyField;
    };
  };
}

export interface MyKURenewTokenResponse {
  code: string;
  username: string;
  accesstoken: string;
}