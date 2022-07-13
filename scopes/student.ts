import { MyKUPersonalResponse } from './../api/types/myku/student';
import { PossibleEmptyField } from ".";

export interface Student {
  stdCode: string;
  name: {
    th: string;
    en: string;
  };
}


export const studentFromResponse = (stdCode: string, kuResponse: MyKUPersonalResponse): Student => {
  return {
    stdCode: stdCode,
    name: {
      th: kuResponse.results.stdPersonalModel.nameTh,
      en: kuResponse.results.stdPersonalModel.nameEn
    }
  }
}
