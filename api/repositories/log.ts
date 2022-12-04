import { LogModel } from "./../../data/models/log";
import { mongodb } from "../../data/mongo";

class LogRepository {
  async newLog(
    uid: string,
    clientId: string,
    scope: string,
    ua: string,
    uaPlatform: string,
    uaMobile: string,
  ) {
    await mongodb.connect();
    return await LogModel.create<Log>({
      uid,
      clientId,
      scope,
      userAgent: ua,
      userAgentPlatform: uaPlatform,
      userAgentMobile: uaMobile,
      timestamp: new Date(Date.now()),
    });
  }
}

export const logRepository = new LogRepository();
