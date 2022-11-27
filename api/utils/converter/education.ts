export const educationCoverter = (
  uid: string,
  educationResponse: MyKUEducationResponse,
): Education[] => {
  const output: Education[] = [];
  for (var i=0; i<educationResponse.results.education.length; i++) {
    const edu = educationResponse.results.education[i]
    const {
      stdId,
      stdCode,
      campusCode,
      campusNameTh,
      campusNameEn,
      facultyCode,
      facultyNameTh,
      facultyNameEn,
      departmentCode,
      departmentNameTh,
      departmentNameEn,
      majorCode,
      majorNameTh,
      majorNameEn,
      teacherName,
      teacherNameEn,
      attenedDate,
      copenId,
    } = edu;
    output.push({
      uid,
      stdId,
      stdCode,
      index: i,
      campusCode,
      campusNameTh,
      campusNameEn,
      facultyCode,
      facultyNameTh,
      facultyNameEn,
      departmentCode,
      departmentNameTh,
      departmentNameEn,
      majorCode,
      majorNameTh,
      majorNameEn,
      teacherName,
      teacherNameEn,
      attenedDate,
      copenId,
    })
  }
  return output
};
