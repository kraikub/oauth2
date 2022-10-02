import { ApplicationModel } from "../../data/models/application";
import { mongodb } from "../../data/mongo";
interface ApplicationFilter {
  clientId?: string;
  ownerId?: string;
  appName?: string;
}

interface ApplicationUpdatable {
  appDescription: string;
  creatorName: string;
  redirects: { url: string }[];
}

export default class ApplicationRepository {
  findOneApp = async (filter: ApplicationFilter) => {
    mongodb.connect();
    return await ApplicationModel.findOne<Application>(filter);
  };
  findApp = async (filter: ApplicationFilter) => {
    mongodb.connect();
    return await ApplicationModel.find<Application>(filter);
  };
  createApp = async (app: Application) => {
    mongodb.connect();
    await ApplicationModel.create(app);
  };

  hasAppName = async (appName: string) => {
    mongodb.connect();
    const app = await ApplicationModel.findOne<Application>({
      appName: appName,
    });
    return app === null ? false : true;
  };

  deleteOne = async (clientId: string) => {
    await mongodb.connect();
    await ApplicationModel.deleteOne({ clientId });
  };

  updateOne = async (clientId: string, a: ApplicationUpdatable) => {
    await mongodb.connect();
    return await ApplicationModel.updateOne<Application>({ clientId }, a);
  };
}
export const applicationRepository = new ApplicationRepository();
