interface Organization {
  orgId: string;
  orgName: string;
  orgUsername: string;
  owner: string;
  availableRoles: RolePrototype[];
  createdAt?: string;
  updatedAt?: string;
}

interface OrganizationRoleData {
  displayPosition: string;
}

interface MemberData extends RolePrototype<OrganizationRoleData> {
  user: SafeUser;
}

interface FullOrganizationDisplayData extends Organization {
  members: MemberData[]
}