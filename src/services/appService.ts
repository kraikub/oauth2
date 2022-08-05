import { nextApiBaseInstance } from "../../libs/axios";
import { ApplicationResponse, CustomApiResponse } from "../../api/types/response";
import { Application } from "../../db/schema/application";

interface CreateApp {
  appName: string;
  appDescription: string;
  creatorName: string;
  callbackUrl: string;
  devCallbackUrl: string;
  appType: string;
}

class AppService {
  public async getApplication(clientId: string) {
    const { data, status } = await nextApiBaseInstance.get<ApplicationResponse>(
      `/api/app/${clientId}`
    );
    if (status === 200) {
      return data.result;
    }
  }
  public async createApplication(a: any, accessToken: string) {
    const { data, status } =
      await nextApiBaseInstance.post<CustomApiResponse<Application>>(`/api/app`, a , {
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      });
      if (status === 200) {
        return data;
      }
  }
}
export const appService = new AppService();
