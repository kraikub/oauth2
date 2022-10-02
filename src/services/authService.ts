import { CustomApiResponse } from "../../api/types/response";
import { sha256 } from "../../api/utils/crypto";
import { RSAEncryptionForMyKU } from "../../api/utils/rsa";
import { nextApiBaseInstance } from "../../libs/axios";

class AuthService {
  public signin = async (
    username: string,
    password: string,
    clientId: string,
    scope: string,
    ref?: string,
    dev?: boolean,
    secret?: string,
    redirectUri?: string,
  ) => {
    const { status, data } = await nextApiBaseInstance.post<
      CustomApiResponse<{ url: string; ctoken: string }>
    >("/api/auth/signin", {
      username: RSAEncryptionForMyKU(username),
      password: RSAEncryptionForMyKU(password),
      sig: sha256(username),
      clientId: clientId,
      scope: scope,
      ref: ref,
      dev: dev,
      secret: secret,
      redirect_uri: redirectUri,
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

  public validateSigninSignature = async (username: string) => {
    const { status, data } = await nextApiBaseInstance.post<
      CustomApiResponse<{ validateResult: boolean }>
    >("/api/private/user/validate", {
      sig: sha256(username),
    });
    return { status, data };
  };

  public claimAccessToken = async (ctoken: string) => {
    console.log("claiming access token...")
    const { status, data } = await nextApiBaseInstance.get<
      CustomApiResponse<{ user: UserWithStudent }>
    >(`/api/public/claim?ctoken=${ctoken}`);
    return { status, data };
  };
}
export const authService = new AuthService();
