interface PublicUser {
  uid: string;
}

interface PublicFullUser {
  uid: string;
  student: Student;
  educations: Education[];
  grades: Grade[];
}

interface PossibleUser {
  uid: string;
  student?: Student;
  educations?: Education[];
  grades?: Grade[];
}

interface User {
  appQuota: number;
  appOwned: number;
  uid: string;
  signinSignature: string;
  shouldUpdate: boolean;
}