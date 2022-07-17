import { UserModel } from "../../db/models/user"
import { mongodb } from "../../db/mongodb"
import { User } from "../../db/schema/user"

class UserRepository {
  findOne = async (uid: string) => {
    await mongodb.connect()
    return UserModel.findOne<User>({
      uid: uid,
    })
  }
}
export const userRepository = new UserRepository()