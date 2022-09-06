import { CustomApiResponse } from "../../api/types/response";
import { nextApiBaseInstance } from "../../libs/axios";

class AuthService {
  public signin = async (
    username: string,
    password: string,
    clientId: string,
    scope: string,
    ref?: string,
    dev?: boolean,
    secret?: string
  ) => {
    const { status, data } = await nextApiBaseInstance.post<
      CustomApiResponse<{ url: string; access: string; refresh: string, user: PublicUserData }>
    >("/api/auth/signin", {
      username: username,
      password: password,
      clientId: clientId,
      scope: scope,
      ref: ref,
      dev: dev,
      secret: secret,
    });
    return { status, data };
  };

  public refresh = async (accessToken: string, refreshToken: string) => {
    const { status, data } = await nextApiBaseInstance.post<
      CustomApiResponse<{ accessToken: string }>
    >(
      "/api/auth/refresh",
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { status, data };
  };
}
export const authService = new AuthService();
