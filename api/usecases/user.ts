import { aggregations } from "../../data/aggregations";
import { bridge } from "../bridge/bridge";
import { appConfig } from "../config/app";
import { academicRepository } from "../repositories/academic";
import { educationRepository } from "../repositories/education";
import { gradeRepository } from "../repositories/grade";
import { studentRepository } from "../repositories/student";
import { userRepository } from "../repositories/user";
import { educationCoverter } from "../utils/converter/education";
import { gradeConverter } from "../utils/converter/grade";
import { studentConverter } from "../utils/converter/student";
import { createAnonymousIdentity } from "../utils/crypto";

export class UserUsecase {
  publicData = async (uid: string): Promise<PublicUserData | null> => {
    const user = await userRepository.findOne({ uid: uid });
    if (user === null) {
      return null;
    }
    return {
      uid: user.uid,
      appOwned: user.appOwned,
      appQuota: user.appQuota,
    };
  };
  findOne = async (filter: UserFilter) => {
    return await userRepository.findOne(filter);
  };
  validateWithSigninSignature = async (sig: string) => {
    return (await userRepository.findOne({
      signinSignature: sig,
    }))
      ? true
      : false;
  };
  create = async (u: User) => {
    return await userRepository.create(u);
  };

  initUserProfile = async (
    uid: string,
    stdId: string,
    signinSignature: string,
    authResponse: MyKULoginResponse
  ): Promise<{ user: User; student: Student; educations: Education[] }> => {
    const newUser: User = {
      uid: uid,
      appQuota: appConfig.INIT_MAX_APP_QUOTA,
      signinSignature: signinSignature,
      personalEmail: "",
      universityEmail: "",
      profileImageUrl: appConfig.defaultProfileImageUrl,
      appOwned: 0,
      shouldUpdate: false,
      settings: {
        email: {
          signin: true,
          news: true,
        },
        tfa: {
          enable: false,
        }
      }
    };
    await userRepository.create(newUser);
    const accessToken = authResponse.accesstoken;
    // Query personal data from myapi.ku.th
    const personalResponse = await bridge.getProfile(stdId, accessToken);
    const student = studentConverter(uid, personalResponse.data, authResponse);

    // Query educational data from myapi.ku.th
    const educationResponse = await bridge.getEducation(stdId, accessToken);
    const educations = educationCoverter(uid, educationResponse.data);

    // Query grades from myapi.ku.th
    // const gradesResponse = await bridge.getGrades(
    //   authResponse.user.student.stdCode,
    //   accessToken
    // );
    // const { academics, grades } = gradeConverter(uid, gradesResponse.data);

    // Save data in db
    await studentRepository.create(student);
    await educationRepository.createMany(educations);
    // await academicRepository.createMany(academics);
    // await gradeRepository.createMany(grades);
    return {
      user: newUser,
      student: student,
      educations: educations,
    };
  };

  computeDataOnScope = async (
    uid: string,
    scope: string,
    clientId: string
  ): Promise<PossibleUser | null> => {
    if (scope === "0") {
      return {
        uid: createAnonymousIdentity(uid, clientId),
      };
    } else {
      const resUser = await userRepository.useAggregationPipeline([
        aggregations.public.user(uid),
      ]);
      if (resUser.length) {
        return resUser[0];
      }
      return null;
    }
  };

  getPrivateUserWithStudent = async (uid: string) => {
    const res = await userRepository.useAggregationPipeline([
      ...aggregations.private.user(uid),
      ...aggregations.public.student(),
      ...aggregations.public.education(),
    ]);
    if (res.length) {
      return res[0];
    } else {
      return null;
    }
  }

  getUserWithStudent = async (uid: string) => {
    const res = await userRepository.useAggregationPipeline([
      ...aggregations.public.user(uid),
      ...aggregations.public.student(),
    ]);
    if (res.length) {
      return res[0];
    } else {
      return null;
    }
  };

  getUserGrades = async (uid: string) => {
    const res = await academicRepository.useAggregationPipeline([
      ...aggregations.public.academic(uid),
    ]);
    return res;
  };
}

export const userUsecase = new UserUsecase();
