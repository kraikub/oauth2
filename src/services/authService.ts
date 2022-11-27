import { sha256 } from "../../api/utils/crypto";
import { RSAEncryptionForMyKU } from "../../api/utils/rsa";
import { nextApiBaseInstance } from "../../libs/axios";

interface SigninParams {
  username: string;
  password: string;
  clientId: string;
  scope: string;
  state: string;
  response_type: string;
  code_challenge: string;
  code_challenge_method: string;
  ref?: string;
  secret?: string;
  redirectUri?: string;
  options?: SigninOptions;
}

class AuthService {
  public signin = async (params: SigninParams) => {
    const { status, data } = await nextApiBaseInstance.post<
      CustomApiResponse<{ url: string; code: string }>
    >("/api/auth/signin", {
      username: RSAEncryptionForMyKU(params.username),
      password: RSAEncryptionForMyKU(params.password),
      sig: sha256(params.username),
      clientId: params.clientId,
      scope: params.scope,
      ref: params.ref,
      secret: params.secret,
      redirect_uri: params.redirectUri,
      response_type: params.response_type,
      code_challenge: params.code_challenge,
      code_challenge_method: params.code_challenge_method,
      ...params.options
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

  public claimAccessToken = async (code: string) => {
    console.log("claiming access token...");
    const { status, data } = await nextApiBaseInstance.post<
      CustomApiResponse<{ user: UserWithStudent }>
    >(`/api/oauth/v1/token`, {
      client_id: "",
      client_secret: "",
      grant_type: "authorization_code",
      payload_type: "http_cookie",
      code: code,
    });
    return { status, data };
  };
}
export const authService = new AuthService();
