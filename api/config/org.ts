type RoleCollections = { [key: string]: BuiltInRole };
type BuiltInRole = {
  roleName: string;
  roleType: string;
  priority: number;
  desc?: string;
};
export const builtInRoles: RoleCollections = {
  owner: {
    roleName: "Organization Owner",
    roleType: "owner",
    priority: 0,
    desc: "Owner",
  },
  admin: {
    roleName: "Admin",
    roleType: "admin",
    priority: 1,
    desc: "Manage members and applications",
  },
  people: {
    roleName: "People Team",
    roleType: "people",
    priority: 2,
    desc: "Manage add/remove people in an organization",
  },
  developer: {
    roleName: "Developer",
    roleType: "developer",
    priority: 3,
    desc: "Manage connected OAuth applications",
  },
  member: {
    roleName: "Member",
    roleType: "member",
    priority: 4,
    desc: "Be a part of this organization. You will get a position label on your name.",
  },
};
