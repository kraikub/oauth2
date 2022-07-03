import axios, { AxiosError } from "axios";
import { mykuInstance, nextApiBaseInstance } from "../../libs/axios";
import { AnyStudentScope } from "../../scopes/student";
import { AuthenticationObject } from "../types/auth.response";
import {
  MyKULoginResponse,
  MyKUPersonalResponse,
} from "../types/myku.response";
import { constructDataFromScope } from "../utils/data";
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
    scope: string
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
      stdId: loginData.user.student.stdId
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
}
export const myKUService = new MyKUService();
