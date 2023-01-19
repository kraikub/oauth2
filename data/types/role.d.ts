interface Role<T = any> extends RolePrototype<T> {
  roleId: string;
  roleRef: string;
  userRef: string;
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


/// 
/// USE FOR BUILT-IN ROLES
///
type RoleCollections = { [key: string]: BuiltInRole };

type RoleMap = { [key: number]: BuiltInRole };

type BuiltInRole = RolePrototype & {
  desc?: string;
};


///
/// USE IN REPOSITORIES ONLY
///
type RoleUpdateDocument = {
  roleName: string;
  roleType: string;
  priority: number;
}
type PositionUpdateDocument = {
  data: OrganizationRoleData
}