import { roleRepo } from './../repositories/role';
import { orgRepo } from "./../repositories/organization";
import { convertToUsername, testStandardUsername } from "./../utils/string";
import { applicationRepository } from "../repositories/application";
import { userRepository } from "../repositories/user";
import { random } from "../utils/crypto";

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
    const appId = convertToUsername(appName);
    const a = await applicationRepository.hasAppId(appId);
    return a ? true : false
  };

  createApp = async (
    uid: string,
    appDto: CreateApplicationDTO,
    refId: string,
    refType: string
  ): Promise<UseCaseResult> => {
    let selectedRefId: string = "";
    let creator: string = "";
    const createdId = convertToUsername(appDto.appName);
    if (!testStandardUsername(createdId)) {
      return {
        success: false,
        message: "appId test failed",
        httpStatus: 409,
      };
    }
    const a = await applicationRepository.hasAppId(createdId);
    if (a) {
      return {
        success: false,
        message: "This appId already taken",
        httpStatus: 409,
      };
    }

    // Reference test
    if (refType === "user") {
      const userRef = await userRepository.findOne({ uid });
      if (!userRef) {
        return {
          success: false,
          message: `Unknown reference user, uid: ${uid || "[empty_string]"}`,
          httpStatus: 409,
        };
      }
      if (userRef.appOwned >= userRef.appQuota) {
        return {
          success: false,
          message: "Maximum quota exceed",
          httpStatus: 409,
        };
      }
      selectedRefId = uid;
      creator = userRef.fullName;
      userRepository.updateAppOwned(userRef.uid, userRef.appOwned + 1);
    } else if (refType === "org") {
      const orgRef = await orgRepo.get(refId);
      if (!orgRef) {
        return {
          success: false,
          message: `Unknown reference org, orgId: ${refId || "[empty_string]"}`,
          httpStatus: 409,
        };
      }
      const roleRef = await roleRepo.getOrgRole(orgRef.orgId, uid);
      if (!roleRef) {
        return {
          success: false,
          message: "Cannot find user's organization role",
          httpStatus: 409,
        }
      }
      if (roleRef.priority > 1) {
        return {
          success: false,
          message: "Not allowed",
          httpStatus: 405,
        }
      }
      if (orgRef.appOwned >= orgRef.appQuota) {
        return {
          success: false,
          message: "Maximum quota exceed",
          httpStatus: 409,
        };
      }
      selectedRefId = refId;
      creator = orgRef.orgName;
      orgRepo.updateAppOwned(orgRef.orgId, orgRef.appOwned + 1);
    } else {
      return {
        success: false,
        message: `Unknown reference type: ${refType || "[empty_string]"}`,
        httpStatus: 409,
      };
    }
    const app: Application = {
      ...appDto,
      creatorName: creator,
      appId: createdId,
      redirects: [],
      clientId: random(16),
      secret: random(28),
      ownerId: uid,
      refId: selectedRefId,
      refType,
    };
    await applicationRepository.createApp(app);
    return {
      success: true,
      data: {
        clientId: app.clientId,
      }
    };
  };

  deleteApp = async (
    uid: string,
    clientId: string
  ): Promise<{ success: boolean; status: number }> => {
    if (clientId === process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID) {
      return {
        success: false,
        status: 403,
      };
    }

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
