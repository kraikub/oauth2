import { Application } from "../../db/schema/application";
import { applicationRepository } from "../repositories/application.repo";

interface ApplicationFilter {
  clientId?: string;
  ownerId?: string;
}

export class ApplicationUsecase {
  findOneApp = async (filter: ApplicationFilter) => {
    return await applicationRepository.findOneApp(filter);
  };

  findApp = async (filter: ApplicationFilter) => {
    return await applicationRepository.findApp(filter);
  };

  createApp = async (app: Application) => {
    return await applicationRepository.createApp(app);
  };
}
export const applicationUsecase = new ApplicationUsecase();
