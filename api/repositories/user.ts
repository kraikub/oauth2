import { UserModel } from "../../db/models/user";
import { mongodb } from "../../db/mongodb";
import { User } from "../../db/schema/user";

interface UserFilter {
  uid?: string;
  stdId?: string;
  stdCode?: string;
}

interface UserUpdatableFields {
  appOwned?: number;
  appQuota?: number;
}

class UserRepository {
  findOne = async (filter: UserFilter) => {
    await mongodb.connect();
    return UserModel.findOne<User>(filter);
  };
  create = async (u: User) => {
    return await UserModel.create<User>(u);
  }
  update = async (uid: string, update: UserUpdatableFields) => {
    return await UserModel.updateOne<User>({ uid: uid }, update)
  }
}
export const userRepository = new UserRepository();
