interface UserFilter {
  uid?: string;
  stdId?: string;
  stdCode?: string;
}

interface PublicUserData {
  uid: string;
  firstNameTh: string;
  middleNameTh: PossibleEmptyField;
  lastNameTh: string;
  firstNameEn: string;
  middleNameEn: PossibleEmptyField;
  lastNameEn: string;
  appQuota: number;
  appOwned: number;
}