export interface AuthenticationObject {
  clientId: string;
  accessToken: string;
  scope: string;
  stdId: string;
  stdCode: string;
  refreshToken: string;
}

export interface AccessTokenBody {
  clientId: string;
  accessToken: string;
  scope: string;
  stdId: string;
  stdCode: string;
}

export interface RefreshTokenBody {
  refreshToken: string;
}
