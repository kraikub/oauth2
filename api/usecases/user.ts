import { User } from "../../db/schema/user";
import { userRepository } from "../repositories/user";

interface UserFilter {
  uid?: string;
  stdId?: string;
  stdCode?: string;
}

export class UserUsecase {
  findOne = async (filter: UserFilter) => {
    return await userRepository.findOne(filter);
  };
  create = async (u : User) => {
    return await userRepository.create(u);
  }
}

export const userUsecase = new UserUsecase();
