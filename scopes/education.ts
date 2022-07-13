import { MyKUEducationResponse } from './../api/types/myku/education';
export interface Education {
  education: [
    {
      stdId: string;
      stdCode: string;
      edulevelNameTh: string;
      edulevelNameEn: string;
      statusNameTh: string;
      statusNameEn: string;
      degreeNameTh: string;
      degreeNameEn: string;
      typeNameTh: string;
      typeNameEn: string;
      campusCode: string;
      campusNameTh: string;
      campusNameEn: string;
      curNameTh: string;
      curNameEn: string;
      facultyCode: string;
      facultyNameTh: string;
      facultyNameEn: string;
      departmentCode: string;
      departmentNameTh: string;
      departmentNameEn: string;
      majorCode: string;
      majorNameTh: string;
      majorNameEn: string;
      projectGetinId: string;
      getinProjectName: string;
      copenId: string;
      copenName: string;
      teacherName: string;
      attenedDate: string;
      branchNameTh: string;
      teacherNameEn: string;
    }
  ];
  statushis: any[];
  majorchange: any[];
}

export const educationFromResponse = (kuResponse: MyKUEducationResponse): Education => {
  return kuResponse.results
}
