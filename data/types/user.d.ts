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
  personalEmail: string;
  profileImageUrl: string;
  shouldUpdate: boolean;
  fullName: string;
  type: string;
  settings: {
    email: {
      signin: boolean;
      news: boolean;
    }
    tfa: {
      enable: boolean;
    }
  }
}