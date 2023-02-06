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
  getOrgRole = async (orgId: string, uid: string) => {
    await mongodb.connect();
    const res = await RoleModel.findOne<Role<OrganizationRoleData>>({
      roleRef: orgId,
      userRef: uid,
    });
    return res;
  };
  getRoleOfUserInOrg = async (orgId: string, uid: string) => {
    await mongodb.connect();
    const res = await RoleModel.findOne<Role<OrganizationRoleData>>({
      roleRef: orgId,
      userRef: uid,
    });
    return res;
  };

  updateOrgRole = async (
    orgId: string,
    uid: string,
    updateDoc: RoleUpdateDocument
  ) => {
    await mongodb.connect();
    return await RoleModel.findOneAndUpdate<Role<OrganizationRoleData>>(
      {
        roleRef: orgId,
        userRef: uid,
      },
      updateDoc
    );
  };

  deleteOrgRole = async (orgId: string, uid: string) => {
    await mongodb.connect();
    return await RoleModel.findOneAndDelete({
      roleRef: orgId,
      userRef: uid,
    });
  };
  clearOrganizationRole = async (orgId: string) => {
    await mongodb.connect();
    return await RoleModel.deleteMany({ roleRef: orgId });
  }
}
export const roleRepo = new RoleRepo();
