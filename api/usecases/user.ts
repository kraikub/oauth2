import { User } from "../../db/schema/user";
import { PossibleEmptyField } from "../../scopes";
import { userRepository } from "../repositories/user";


export class UserUsecase {
  publicData = async (uid: string):Promise<PublicUserData | null> => {
    const user =  await userRepository.findOne({ uid: uid });
    if (user === null) {
      return null;
    }
    return {
      uid: user.uid,
      firstNameTh: user.firstNameTh,
      middleNameTh: user.middleNameTh,
      lastNameTh: user.lastNameTh,
      firstNameEn: user.firstNameEn,
      middleNameEn: user.middleNameEn,
      lastNameEn: user.lastNameEn,
      appOwned: user.appOwned,
      appQuota: user.appQuota,
    }
  };
  findOne = async (filter: UserFilter) => {
    return await userRepository.findOne(filter);
  };
  create = async (u: User) => {
    return await userRepository.create(u);
  };
}

export const userUsecase = new UserUsecase();
