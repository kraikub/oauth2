import { ApplicationModel } from '../../db/models/application';
import { mongodb } from '../../db/mongodb';
import { Application } from './../../db/schema/application';
interface ApplicationFilter {
  clientId?: string;
  ownerId?: string;
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
}
export const applicationRepository = new ApplicationRepository()