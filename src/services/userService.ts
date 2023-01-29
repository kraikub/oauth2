import { nextApiBaseInstance } from "../../libs/axios";

class UserService {
  public get = async () => {
    const { status, data } = await nextApiBaseInstance.get<
      CustomApiResponse<FullUserData | null>
    >("/api/private/user");
    return { status, data };
  };

  public signout = async () => {
    const { status, data } = await nextApiBaseInstance.get<
      CustomApiResponse<null>
    >("/api/public/signout");
    return { status, data };
  };

  public safeUserFromUsername = async (username: string) => {
    return await nextApiBaseInstance.get<
      CustomApiResponse<{ user: SafeUser | null }>
    >(`/api/internal/user/safe?username=${username}`);
  };

  public changeProfilePic = async (key: string, index: number) => {
    return await nextApiBaseInstance.post<CustomApiResponse>(
      `/api/internal/user/profilepic`,
      {
        key,
        index
      }
    );
  };
}
export const userService = new UserService();
