import { applicationRepository } from "../repositories/application";
import { userRepository } from "../repositories/user";

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
      throw new Error("User is not existed.");
    }
    if (owner.appOwned >= owner.appQuota) {
      return false;
    }
    await applicationRepository.createApp(app);
    await userRepository.update(owner.uid, { appOwned: owner.appOwned + 1 });
    return true;
  };

  deleteApp = async (
    uid: string,
    clientId: string
  ): Promise<{ success: boolean; status: number }> => {
    if (!(await this.isOwned(uid, clientId))) {
      return {
        success: false,
        status: 403,
      };
    }
    await applicationRepository.deleteOne(clientId);
    const owner = await userRepository.findOne({ uid: uid });
    if (!owner) {
      throw new Error("User is not existed.");
    }
    await userRepository.update(owner.uid, { appOwned: owner.appOwned - 1 });

    return {
      success: true,
      status: 200,
    };
  };

  updateApp = async (
    uid: string,
    clientId: string,
    a: ApplicationUpdatable
  ): Promise<{
    success: boolean;
    status: number;
    application: any;
  }> => {
    if (!(await this.isOwned(uid, clientId))) {
      return {
        success: false,
        status: 403,
        application: null,
      };
    }
    const { appDescription, creatorName, redirects } = a;
    if (!creatorName || !appDescription) {
      return {
        success: false,
        status: 422,
        application: null,
      };
    }
    const updatedApp = await applicationRepository.updateOne(clientId, {
      appDescription,
      creatorName,
      redirects,
    });
    
    return {
      success: true,
      status: 200,
      application: updatedApp,
    };
  };

  isOwned = async (uid: string, clientId: string): Promise<boolean> => {
    const app = await applicationRepository.findOneApp({ clientId });
    if (!app) {
      return false;
    }
    return app.ownerId === uid;
  };
}
export const applicationUsecase = new ApplicationUsecase();
