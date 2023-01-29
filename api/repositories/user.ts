import { PipelineStage } from "mongoose";
import { fullStudentUserAggr, studentAggr } from "../../data/aggregations";
import { UserModel } from "../../data/models/user";
import { mongodb } from "../../data/mongo";

interface UserFilter {
  uid?: string;
  signinSignature?: string;
  personalEmail?: string;
  username?: string;
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
  findWithUsername = async (username: string) => {
    await mongodb.connect();
    return UserModel.findOne<User>({ username });
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

  setOrgId = async (uid: string, orgId: string) => {
    await mongodb.connect();
    return await UserModel.updateOne<User>({ uid: uid }, { orgId });
  };

  updateProfileImageUrl = async (uid: string, profileImageUrl: string) => {
    await mongodb.connect();
    return await UserModel.updateOne<User>({ uid }, { profileImageUrl });
  };

  updateAppOwned = async (uid: string, newValue: number) => {
    return UserModel.updateOne<User>({ uid }, { appOwned: newValue });
  }
}
export const userRepository = new UserRepository();
