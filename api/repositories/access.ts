import { AccessModel } from './../../data/models/access';
import { mongodb } from "../../data/mongo";

class AccessRepository {
  async addAccess(
    a: Access
  ) {
    await mongodb.connect();
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    return await AccessModel.findOneAndUpdate<Access>({ accessId: a.accessId }, a, options);
  }
}
export const accessRepository = new AccessRepository();
