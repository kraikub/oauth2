export interface AuthenticationObject {
  clientId: string;
  accessToken: string;
  scope: string;
  stdId: string;
  refreshToken: string;
}

export interface AccessTokenBody {
  clientId: string;
  accessToken: string;
  scope: string;
  stdId: string;
}

export interface RefreshTokenBody {
  refreshToken: string;
}
