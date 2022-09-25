import { AccessTokenBody, RefreshTokenBody } from "../types/auth";

export interface MiddlewareOutput<type> {
  success: boolean;
  payload: type;
  error?: unknown;
}

export interface RenewMiddlewareOutput {
  success: boolean;
  accessTokenPayload: AccessTokenBody;
  refreshTokenPayload: RefreshTokenBody;
  error?: unknown;
}
