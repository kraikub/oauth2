import { calculateAcademicHash } from "../crypto";

export const gradeConverter = (
  uid: string,
  gradesResponse: MyKUGradeResponse
): { academics: Academic[]; grades: Grade[] } => {
  const grades = [];
  const academics = [];
  const info = gradesResponse.results;
  for (const academicYear of info) {
    const aca: Academic = {
      uid: uid,
      year: academicYear.academicYear,
      totalCredit: academicYear.cr,
      gpa: academicYear.gpa,
      hash: calculateAcademicHash(uid, academicYear.academicYear),
    };
    for (const course of academicYear.grade) {
      const {
        std_code,
        subject_code,
        subject_name_th,
        subject_name_en,
        credit,
        grade,
        registration_year,
        registration_semester,
      } = course;
      const newGrade: Grade = {
        uid: uid,
        stdCode: std_code,
        subjectCode: subject_code,
        subjectNameTh: subject_name_th,
        subjectNameEn: subject_name_en,
        credit: credit,
        grade: grade,
        registerationYear: registration_year,
        registerationSemester: registration_semester,
        academicHash: aca.hash,
      };
      grades.push(newGrade);
    }
    academics.push(aca);
  }
  return {
    academics: academics,
    grades: grades,
  };
};
