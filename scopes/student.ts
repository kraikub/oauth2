export interface StudentScope1 {
  studentId: string;
  name: {
    th: Name;
    en: Name;
  };
  education: {
    en: Education;
    th: Education;
  };
}

export interface StudentScope0 {
  studentId: string;
  name: {
    th: Name;
    en: Name;
  };
}

export interface Name {
  title: string;
  firstName: string;
  middleName: PossibleEmptyField;
  lastName: string;
}

export interface Education {
  campus: {
    code: string;
    name: string;
  };
  faculty: {
    code: string;
    name: string;
  };
  department: {
    code: string;
    name: string;
  };
}

export type PossibleEmptyField = string | null;
export type AnyStudentScope = StudentScope0 | StudentScope1;
