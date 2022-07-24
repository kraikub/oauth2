import { UserModel } from "../../db/models/user";
import { mongodb } from "../../db/mongodb";
import { User } from "../../db/schema/user";

interface UserFilter {
  uid?: string;
  stdId?: string;
  stdCode?: string;
}

class UserRepository {
  findOne = async (filter: UserFilter) => {
    await mongodb.connect();
    return UserModel.findOne<User>(filter);
  };
  create = async (u: User) => {
    return await UserModel.create<User>(u);
  }
}
export const userRepository = new UserRepository();
