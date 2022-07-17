import { CustomApiResponse } from "../../api/types/response";
import { User } from "../../db/schema/user";
import { nextApiBaseInstance } from "../../libs/axios";

class UserService {
  public get = async (accessToken: string) => {
    const { status, data } = await nextApiBaseInstance.get<CustomApiResponse<User | null>>("/api/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { status, data };
  };
}
export const userService = new UserService();
