import { AnyStudentScope, Name, StudentScope0 } from "../../scopes/student";
import {
  MyKULoginResponse,
  MyKUPersonalResponse,
} from "../types/myku.response";

// return th, en name
const createName = (dataFromLogin: MyKULoginResponse): [Name, Name] => {
  return [
    {
      title: dataFromLogin.user.student.titleTh,
      firstName: dataFromLogin.user.student.firstNameTh,
      middleName: dataFromLogin.user.student.middleNameTh,
      lastName: dataFromLogin.user.student.lastNameTh,
    },
    {
      title: dataFromLogin.user.student.titleEn,
      firstName: dataFromLogin.user.student.firstNameEn,
      middleName: dataFromLogin.user.student.middleNameEn,
      lastName: dataFromLogin.user.student.lastNameEn,
    },
  ];
};

const handleScope0 = (dataFromLogin: MyKULoginResponse): StudentScope0 => {
  const [nameTh, nameEn] = createName(dataFromLogin);
  return {
    studentId: dataFromLogin.user.idCode,
    name: {
      th: nameTh,
      en: nameEn,
    },
  };
};

export const constructDataFromScope = (
  scope: string,
  dataFromLogin: MyKULoginResponse,
  dataFromPersonal: MyKUPersonalResponse
): AnyStudentScope | null => {
  if (scope === "0") {
    return handleScope0(dataFromLogin);
  }
  return null;
};
