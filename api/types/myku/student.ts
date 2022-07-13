import { PossibleEmptyField } from "../../../scopes";

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