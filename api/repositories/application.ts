import { ApplicationModel } from '../../db/models/application';
import { mongodb } from '../../db/mongodb';
import { Application } from '../../db/schema/application';
interface ApplicationFilter {
  clientId?: string;
  ownerId?: string;
  appName?: string;
}

export default class ApplicationRepository {
  findOneApp = async (filter: ApplicationFilter) => {
    mongodb.connect()
    return await ApplicationModel.findOne<Application>(filter)
  }
  findApp = async (filter: ApplicationFilter) => {
    mongodb.connect()
    return await ApplicationModel.find<Application>(filter)
  }
  createApp = async (app: Application) => {
    mongodb.connect()
    await ApplicationModel.create(app)
  }

  hasAppName = async (appName: string) => {
    mongodb.connect()
    const app = await ApplicationModel.findOne<Application>({
      appName: appName,
    });
    return app === null ? false : true;
  }

  deleteOne = async (clientId: string) => {
    await mongodb.connect()
    await ApplicationModel.deleteOne({ clientId })
  }
}
export const applicationRepository = new ApplicationRepository()