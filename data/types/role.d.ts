interface Role<T = any> {
  roleId: string;
  roleName: string;
  roleType: string;
  priority: number;
  roleRef: string;
  userRef: string;
  data: T;
  createdAt?: string;
  updatedAt?: string;
}

interface RolePrototype<T = any> {
  roleName: string;
  roleType: string;
  priority: number;
  data: T;
}

interface RoleWithUser<T = any> extends Role<T> {
  user: ExtraSafeUser;
}
