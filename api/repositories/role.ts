import { RoleModel } from "./../../data/models/role";

import { mongodb } from "../../data/mongo";

class RoleRepo {
  create = async (role: Role) => {
    await mongodb.connect();
    const res = await RoleModel.create<Role>(role);
    return res;
  };
  get = async (roldId: string) => {
    await mongodb.connect();
    const res = await RoleModel.findOne<Role>({ roldId });
    return res;
  };

  getRoleOfUserInOrg = async (orgId: string, uid: string) => {
    await mongodb.connect();
    const res = await RoleModel.findOne<Role<OrganizationRoleData>>({ roleRef: orgId, userRef: uid });
    return res;
  };
}
export const roleRepo = new RoleRepo();
