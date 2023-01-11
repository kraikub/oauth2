import { PipelineStage } from "mongoose";
import {
  fullStudentUserAggr,
  studentAggr,
} from "../../data/aggregations";
import { UserModel } from "../../data/models/user";
import { mongodb } from "../../data/mongo";

interface UserFilter {
  uid?: string;
  signinSignature?: string;
  personalEmail?: string;

}

interface UserUpdatableFields {
  appOwned?: number;
  appQuota?: number;
  personalEmail?: string;
}

class UserRepository {
  findOne = async (filter: UserFilter) => {
    await mongodb.connect();
    return UserModel.findOne<User>(filter);
  };
  create = async (u: User) => {
    await mongodb.connect();
    await UserModel.create<User>(u);
    return u;
  };
  update = async (uid: string, update: UserUpdatableFields) => {
    await mongodb.connect();
    return await UserModel.updateOne<User>({ uid: uid }, update);
  };
  getFullUser = async (uid: string) => {
    await mongodb.connect();
    return await UserModel.aggregate<FullUserData>(fullStudentUserAggr(uid));
  };
  getUserWithStudent = async (uid: string) => {
    await mongodb.connect();
    const users: UserWithStudent[] = await UserModel.aggregate<UserWithStudent>(
      studentAggr(uid)
    );
    if (!users.length) return null;
    return users[0];
  };
  useAggregationPipeline = async (pipeline: any[]) => {
    await mongodb.connect();
    return await UserModel.aggregate(pipeline);
  };
}
export const userRepository = new UserRepository();
