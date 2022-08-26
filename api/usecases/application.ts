import { Application } from "../../db/schema/application";
import { applicationRepository } from "../repositories/application";
import { userRepository } from "../repositories/user";

interface ApplicationFilter {
  clientId?: string;
  ownerId?: string;
  appName?: string;
}

export class ApplicationUsecase {
  findOneApp = async (filter: ApplicationFilter) => {
    return await applicationRepository.findOneApp(filter);
  };

  findApp = async (filter: ApplicationFilter) => {
    return await applicationRepository.findApp(filter);
  };

  hasAppName = async (appName: string): Promise<boolean> => {
    if (!appName) return false;
    return await applicationRepository.hasAppName(appName);
  };

  createApp = async (app: Application): Promise<boolean> => {
    if (await applicationRepository.hasAppName(app.appName)) {
      throw new Error(`App name ${app.appName} is already existed.`);
    }
    const owner = await userRepository.findOne({ uid: app.ownerId });
    if (!owner) {
      throw new Error("User is not existed.")
    }
    if (owner.appOwned >= owner.appQuota) {
      return false;
    }
    console.log(1)
    await applicationRepository.createApp(app);
    console.log(2)
    await userRepository.update(owner.uid, { appOwned: owner.appOwned + 1 })
    console.log(3)
    return true;
  };
}
export const applicationUsecase = new ApplicationUsecase();
