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
interface SafeUser extends ExtraSafeUser {
  type: string;
  personalEmail: string;
  createdAt?: string;
}

interface ExtraSafeUser {
  uid: string;
  profileImageUrl: string;
  fullName: string;
  username: string;
}

interface User {
  appQuota: number;
  appOwned: number;
  uid: string;
  signinSignature: string;
  personalEmail: string;
  username: string;
  profileImageUrl: string;
  shouldUpdate: boolean;
  fullName: string;
  orgId: string;
  type: string;
  settings: {
    email: {
      signin: boolean;
      news: boolean;
    };
    tfa: {
      enable: boolean;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}
