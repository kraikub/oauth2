import { SessionModel } from './../../data/models/session';
import { mongodb } from "../../data/mongo";

class SessionRepository {
  async newSession(
    s: Session
  ) {
    await mongodb.connect();
    return await SessionModel.create<Session>(s);
  }
}
 
export const sessionRepository = new SessionRepository();
