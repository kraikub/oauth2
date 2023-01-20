
export const builtInRoles: RoleCollections = {
  owner: {
    roleName: "Organization Owner",
    roleType: "owner",
    priority: 0,
    desc: "Owner",
    data: {},
  },
  admin: {
    roleName: "Admin",
    roleType: "admin",
    priority: 1,
    desc: "Manage members and applications",
    data: {},
  },
  people: {
    roleName: "People Team",
    roleType: "people",
    priority: 2,
    desc: "Manage add/remove people in an organization",
    data: {},
  },
  developer: {
    roleName: "Developer",
    roleType: "developer",
    priority: 3,
    desc: "Manage connected applications",
    data: {},
  },
  member: {
    roleName: "Member",
    roleType: "member",
    priority: 4,
    desc: "Be a part of this organization. You will get a position label on your name.",
    data: {},
  },
};

export const roleMap: RoleMap = {
  0: builtInRoles["owner"],
  1: builtInRoles["admin"],
  2: builtInRoles["people"],
  3: builtInRoles["developer"],
  4: builtInRoles["member"],
}