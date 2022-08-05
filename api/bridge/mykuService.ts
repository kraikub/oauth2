import { MyKUGradeResponse } from '../types/myku/grade';
import { MyKUEducationResponse } from "../types/myku/education";
import { MyKUPersonalResponse } from "../types/myku/student";
import { mykuInstance } from "../../libs/axios";
import { AuthenticationObject } from "../types/auth.response";
import { MyKULoginResponse, MyKURenewTokenResponse } from "../types/myku/auth";
import { mapQueryStringToUrl } from "../utils/query";

class MyKUService {
  private appKey: string;
  constructor() {
    this.appKey = process.env.MYKU_APPKEY
      ? process.env.MYKU_APPKEY
      : this.panic("Require .env MYKU_APPKEY");
  }
  private panic(err: string, errcode?: number) {
    console.error(
      `panic: ${errcode ? `[code:${errcode}]` : ""} Reason: ${err}`
    );
    process.exit(1);
    return "";
  }

  public externalLogin = async (
    username: string,
    password: string,
    scope: string,
    clientId: string
  ): Promise<AuthenticationObject | null> => {
    const { status: loginStatus, data: loginData } = await this.login(
      username,
      password
    );
    if (loginStatus !== 200) {
      return null;
    }
    return {
      accessToken: loginData.accesstoken,
      scope: scope,
      stdId: loginData.user.student.stdId,
      stdCode: loginData.user.idCode,
      clientId: clientId,
      refreshToken: loginData.renewtoken,
      response: loginData
    };
  };

  public login = async (username: string, password: string) => {
    const { status, data } = await mykuInstance.post<MyKULoginResponse>(
      "/auth/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "app-key": this.appKey,
        },
      }
    );

    return { status, data };
  };

  public getProfile = async (stdId: string, accessToken: string) => {
    const { status, data } = await mykuInstance.get<MyKUPersonalResponse>(
      mapQueryStringToUrl("/std-profile/getStdPersonal", {
        stdId: stdId,
      }),
      {
        headers: {
          "x-access-token": accessToken,
          "app-key": this.appKey,
        },
      }
    );
    return { status, data };
  };

  public getEducation = async (stdId: string, accessToken: string) => {
    const { status, data } = await mykuInstance.get<MyKUEducationResponse>(
      mapQueryStringToUrl("/std-profile/getStdEducation", {
        stdId: stdId,
      }),
      {
        headers: {
          "x-access-token": accessToken,
          "app-key": this.appKey,
        },
      }
    );
    return { status, data };
  };
  public getGrades = async (stdCode: string, accessToken: string) => {
    const { status, data } = await mykuInstance.get<MyKUGradeResponse>(
      mapQueryStringToUrl("/std-profile/checkGrades", {
        idcode: stdCode,
      }),
      {
        headers: {
          "x-access-token": accessToken,
          "app-key": this.appKey,
        },
      }
    );
    return { status, data };
  };

  public renew = async (accessToken: string, refreshToken: string) => {
    const { status, data } = await mykuInstance.post<MyKURenewTokenResponse>(
      "/auth/renew",
      {
        renewtoken: refreshToken,
      },
      {
        headers: {
          "x-access-token": accessToken,
          "app-key": this.appKey,
        },
      }
    );
    return { status, data };
  };
}
export const myKUService = new MyKUService();
