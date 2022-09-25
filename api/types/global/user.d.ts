interface UserFilter {
  uid?: string;
  stdId?: string;
  stdCode?: string;
}

interface PublicUserData {
  uid: string;
  appQuota?: number;
  appOwned?: number;
}