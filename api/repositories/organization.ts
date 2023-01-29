import { orgFullDataForDisplay } from './../../data/aggregations/org';
import { organizationModel } from "../../data/models/organization";
import { mongodb } from "../../data/mongo";

class OrganizationRepo {
  create = async (org: Organization) => {
    await mongodb.connect();
    const res = await organizationModel.create<Organization>(org);
    return res;
  };
  get = async (orgId: string) => {
    await mongodb.connect();
    const res = await organizationModel.findOne<Organization>({ orgId });
    return res;
  };

  getWithName = async (orgName: string) => {
    await mongodb.connect();
    const res = await organizationModel.findOne<Organization>({ orgName });
    return res;
  };

  getWithUserName = async (orgUsername: string) => {
    await mongodb.connect();
    const res = await organizationModel.findOne<Organization>({ orgUsername });
    return res;
  };

  getFullOrg = async (orgId: string) => {
    const res = await organizationModel.aggregate(orgFullDataForDisplay(orgId));
    if (!res.length) {
      return null;
    }
    return res[0] as FullOrganizationDisplayData;
  };

  updateAppOwned = async (orgId: string, newValue: number) => {
    return await organizationModel.updateOne<Organization>({ orgId, appOwned: newValue })
  }
}
export const orgRepo = new OrganizationRepo();
