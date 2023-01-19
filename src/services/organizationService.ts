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
    return nextApiBaseInstance.post<CustomApiResponse<{ orgId: string }>>(
      "/api/internal/org/create",
      {
        orgName,
        orgUsername,
        position
      }
    );
  };

  invite = async (orgId: string, uid: string, priority: number, position: string) => {
    return nextApiBaseInstance.post<CustomApiResponse<any>>(
      `/api/internal/org/add-member/${orgId}`,
      {
        uid,
        priority,
        position
      }
    );
  };

  updateRole = async (orgId: string, uid: string, priority: number) => {
    return nextApiBaseInstance.post<CustomApiResponse>(`/api/internal/org/update/role`, {
      orgId,
      uid,
      priority,
    })
  }

  removeMember = async (orgId: string, uid: string) => {
    return nextApiBaseInstance.post<CustomApiResponse>(`/api/internal/org/remove`, {
      orgId,
      uid,
    })
  }
  leave = async () => {
    return nextApiBaseInstance.get<CustomApiResponse>(`/api/internal/org/leave`)
  }
}
export const orgService = new OrganizationService();
