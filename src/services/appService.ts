import { nextApiBaseInstance } from "../../libs/axios";
import {
  ApplicationResponse,
  CustomApiResponse,
} from "../../api/types/response";
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
  // User owned applications only.
  public async getApplications(accessToken: string) {
    const { data, status } = await nextApiBaseInstance.get<
      CustomApiResponse<Application[]>
    >(`/api/app`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (status === 200) {
      return data.payload;
    }
  }

  public async getApplication(clientId: string, accessToken: string) {
    const { data, status } = await nextApiBaseInstance.get<CustomApiResponse<Application>>(
      `/api/app/${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (status === 200 || status === 304) {
      return data.payload;
    }
  }
  public async createApplication(a: any, accessToken: string) {
    const { data, status } = await nextApiBaseInstance.post<
      CustomApiResponse<Application>
    >(`/api/app`, a, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (status === 200) {
      return data;
    }
  }

  public async hasName(appNameToCheck: string) {
    const { data, status } = await nextApiBaseInstance.get<
      CustomApiResponse<boolean>
    >(`/api/app/hasname?name=${appNameToCheck}`);
    if (status === 200) {
      return data;
    }
  }
}
export const appService = new AppService();
