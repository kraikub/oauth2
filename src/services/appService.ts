import { nextApiBaseInstance } from "../../libs/axios";
import {
  ApplicationResponse,
  CustomApiResponse,
} from "../../api/types/response";

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
  public async getApplications() {
    const { data, status } = await nextApiBaseInstance.get<
      CustomApiResponse<Application[]>
    >(`/api/app`);
    if (status === 200) {
      return data.payload;
    }
  }

  public async getApplication(clientId: string) {
    const { data, status } = await nextApiBaseInstance.get<
      CustomApiResponse<Application>
    >(`/api/app/${clientId}`);
    if (status === 200 || status === 304) {
      return data.payload;
    }
  }
  public async createApplication(a: any) {
    const { data, status } = await nextApiBaseInstance.post<
      CustomApiResponse<Application>
    >(`/api/app`, a);
    if (status === 200) {
      return data;
    }
  }

  public async deleteApplication(clientId: string) {
    const { status, data } = await nextApiBaseInstance.delete<
      CustomApiResponse<any>
    >(`/api/app/${clientId}`);
    if (status === 200) {
      return data;
    }
  }

  public async updateAppplcation(
    clientId: string,
    payload: any
  ) {
    const { data, status } = await nextApiBaseInstance.put<
      CustomApiResponse<Application>
    >(`/api/app/${clientId}`, payload);
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
