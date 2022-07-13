export interface MyKUGradeResponse {
  code: string;
  results: MyKUAcademic[];
}

export interface MyKUAcademic {
  academicYear: string;
  gpa: number;
  cr: number;
  grade: MyKUCourse[]
}

export interface MyKUCourse {
  std_code: string;
  std_id: string;
  subject_code: string;
  subject_name_th: string;
  subject_name_en: string;
  credit: number;
  grade: string;
  registration_year: number;
  registration_semester: number;
  rownum: string;
  grouping_data: string;
  gpa: number;
  cr: number;
}
