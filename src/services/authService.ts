import { CustomApiResponse } from "../../api/types/response";
import { nextApiBaseInstance } from "../../libs/axios";

class AuthService {
  public signin = async (
    username: string,
    password: string,
    clientId: string,
    scope: string,
    ref?: string
  ) => {
    const { status, data } = await nextApiBaseInstance.post<
      CustomApiResponse<{ accessToken: string }>
    >("/api/auth/signin", {
      username: username,
      password: password,
      clientId: clientId,
      scope: scope,
      ref: ref,
    });
    return { status, data };
  };
}
export const authService = new AuthService();
