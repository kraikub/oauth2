import { MyKUGradeResponse } from "./../api/types/myku/grade";
export interface Academic {
  academicYear: string;
  gpa: number;
  credit: number;
  grades: Course[];
}
export interface Course {
  stdCode: string;
  stdId: string;
  subjectCode: string;
  subjectNameTh: string;
  subjectNameEn: string;
  credit: number;
  grade: string;
  registrationYear: number;
  registrationSemester: number;
  groupingData: string;
}

export const gradeFromResponse = (
  kuResponse: MyKUGradeResponse
): Academic[] => {
  const result: Academic[] = [];
  for (const academic of kuResponse.results) {
    const tmp: Course[] = [];
    for (const course of academic.grade) {
      tmp.push({
        stdCode: course.std_code,
        stdId: course.std_id,
        subjectCode: course.subject_code,
        subjectNameTh: course.subject_name_th,
        subjectNameEn: course.subject_name_en,
        credit: course.credit,
        grade: course.grade,
        registrationYear: course.registration_year,
        registrationSemester: course.registration_semester,
        groupingData: course.grouping_data,
      });
    }
    result.push({
      academicYear: academic.academicYear,
      gpa: academic.gpa,
      credit: academic.cr,
      grades: tmp,
    });
  }
  return result;
};
