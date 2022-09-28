import { fullStudentUserAggr, studentAggr } from "../../data/aggregations/users";
import { UserModel } from "../../data/models/user";
import { mongodb } from "../../data/mongo";

interface UserFilter {
  uid?: string;
  signinSignature?: string;
  stdId?: string;
  stdCode?: string;
}

interface UserUpdatableFields {
  appOwned?: number;
  appQuota?: number;
}

class UserRepository {
  findOne = async (filter: UserFilter) => {
    await mongodb.connect()
    return UserModel.findOne<User>(filter);
  };
  create = async (u: User) => {
    await mongodb.connect()
    await UserModel.create<User>(u);
    return u;
  }
  update = async (uid: string, update: UserUpdatableFields) => {
    await mongodb.connect()
    return await UserModel.updateOne<User>({ uid: uid }, update)
  }
  getFullUser = async (uid: string) => {
    await mongodb.connect()
    return await UserModel.aggregate<FullUserData>(fullStudentUserAggr(uid))
  }
  getUserWithStudent = async (uid: string) => {
    await mongodb.connect()
    const users: UserWithStudent[] = await UserModel.aggregate<UserWithStudent>(studentAggr(uid))
    if (!users.length) return null
    return users[0];
  }
}
export const userRepository = new UserRepository();
