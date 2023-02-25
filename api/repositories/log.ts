import { LogModel } from "./../../data/models/log";
import { mongodb } from "../../data/mongo";
import { getUserLogsAggregation } from "../../data/aggregations/logs";

class LogRepository {
  async newLog(
    uid: string,
    clientId: string,
    scope: string,
    ua: string,
    uaPlatform: string,
    uaMobile: string,
    ip: string,
    ssid: string
  ) {
    await mongodb.connect();
    return await LogModel.create<Log>({
      uid,
      clientId,
      scope,
      userAgent: ua,
      userAgentPlatform: uaPlatform,
      userAgentMobile: uaMobile,
      ip,
      ssid,
      timestamp: new Date(Date.now()),
    });
  }
  getUserLogsWithApps = async (uid: string) => {
    await mongodb.connect();
    return await LogModel.aggregate<LogDTO>(getUserLogsAggregation(uid));
  };

}

export const logRepository = new LogRepository();
