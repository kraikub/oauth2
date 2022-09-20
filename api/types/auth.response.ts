import { MyKULoginResponse } from "./myku/auth";

export interface AuthenticationObject {
  clientId: string;
  accessToken: string;
  scope: string;
  stdId: string;
  stdCode: string;
  refreshToken: string;
  response: MyKULoginResponse;
}

export interface AccessTokenBody {
  clientId: string;
  accessToken: string;
  scope: string;
  uid: string;
}

export interface RefreshTokenBody {
  refreshToken: string;
}
