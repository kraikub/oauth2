import { nextApiBaseInstance } from "../../libs/axios";

class UserService {
  public get = async () => {
    const { status, data } = await nextApiBaseInstance.get<CustomApiResponse<FullUserData | null>>("/api/private/user");
    return { status, data };
  };

  public signout = async () => {
    const { status, data } = await nextApiBaseInstance.get<CustomApiResponse<null>>("/api/public/signout");
    return { status, data };
  }
}
export const userService = new UserService();
