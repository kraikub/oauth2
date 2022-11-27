type PossibleEmptyField = string | null;

interface MyKULoginResponse {
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

interface MyKURenewTokenResponse {
  code: string;
  username: string;
  accesstoken: string;
}

interface MyKUEducationResponse {
  code: string;
  results: {
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
  };
  cache: boolean;
}

interface MyKUGradeResponse {
  code: string;
  results: MyKUAcademic[];
}

interface MyKUAcademic {
  academicYear: string;
  gpa: number;
  cr: number;
  grade: MyKUCourse[]
}

interface MyKUCourse {
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

interface MyKUPersonalResponse {
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

interface AuthenticationObject {
  clientId: string;
  accessToken: string;
  scope: string;
  stdId: string;
  stdCode: string;
  refreshToken: string;
  response: MyKULoginResponse;
}