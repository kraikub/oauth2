import { nextApiBaseInstance } from "../../libs/axios";

class OrganizationService {
  checkName = async (orgName: string) => {
    return nextApiBaseInstance.post<CustomApiResponse<{ available: boolean }>>(
      "/api/internal/org/is-name-ok",
      {
        orgName,
      }
    );
  };

  checkUsername = async (orgUsername: string) => {
    return nextApiBaseInstance.post<CustomApiResponse<{ available: boolean }>>(
      "/api/internal/org/is-username-ok",
      {
        orgUsername,
      }
    );
  };

  create = async (orgName: string, orgUsername: string, position: string) => {
    return nextApiBaseInstance.post<CustomApiResponse<{ available: boolean }>>(
      "/api/internal/org/create",
      {
        orgName,
        orgUsername,
        position
      }
    );
  };

  invite = async (orgId: string, uid: string, role: RolePrototype<OrganizationRoleData>) => {
    return nextApiBaseInstance.post<CustomApiResponse<any>>(
      `/api/internal/org/add-member/${orgId}`,
      {
        uid,
        role,
      }
    );
  };
}
export const orgService = new OrganizationService();
