import {
  checkRedisTopic,
  concatFullName,
  createUsername,
} from "./../utils/string";
import { mailService } from "./../mail/index";
import { sha256 } from "./../utils/crypto";
import { redis } from "./../../data/redis/index";
import { aggregations } from "../../data/aggregations";
import { bridge } from "../bridge/bridge";
import { appConfig } from "../config/app";
import { academicRepository } from "../repositories/academic";
import { educationRepository } from "../repositories/education";
import { studentRepository } from "../repositories/student";
import { userRepository } from "../repositories/user";
import { educationCoverter } from "../utils/converter/education";
import { studentConverter } from "../utils/converter/student";
import { createAnonymousIdentity } from "../utils/crypto";
import { p } from "../../src/utils/path";
import { AxiosResponse } from "axios";

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

  newPersonalEmail = async (uid: string, newEmail: string) => {
    return await userRepository.update(uid, { personalEmail: newEmail });
  };

  initUserProfile = async (
    uid: string,
    stdId: string,
    signinSignature: string,
    authResponse: MyKULoginResponse
  ): Promise<{ user: User; student: Student; educations: Education[] }> => {
    let username = "";
    let generatedTmpUsername = "";
    let maxLoop = 10000;
    let minLastnameLengthThresold = 2;
    for (let i = minLastnameLengthThresold; i < maxLoop; i++) {
      generatedTmpUsername = createUsername(
        authResponse.user.firstNameEn,
        authResponse.user.lastNameEn,
        i
      );
      const found = await userRepository.findWithUsername(generatedTmpUsername);
      if (!found) {
        username = generatedTmpUsername;
        break;
      }
    }
    if (!username) {
      throw new Error("Maximum loop exceed on username generation");
    }

    const newUser: User = {
      uid: uid,
      appQuota: appConfig.INIT_MAX_APP_QUOTA,
      signinSignature: signinSignature,
      personalEmail: "",
      fullName: concatFullName(
        authResponse.user.firstNameEn,
        authResponse.user.lastNameEn
      ),
      type: "student",
      profileImageUrl: appConfig.defaultProfileImageUrl,
      appOwned: 0,
      shouldUpdate: false,
      orgId: "",
      username: username,
      settings: {
        email: {
          signin: true,
          news: true,
        },
        tfa: {
          enable: false,
        },
      },
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

  getSafeUserContentFromUsername = async (
    username: string
  ): Promise<UseCaseResult<{ user: SafeUser | null }>> => {
    const a = await userRepository.findWithUsername(username);
    if (!a) {
      return {
        success: true,
        data: { user: null },
      };
    }
    const filtered: SafeUser = {
      username: a.username,
      uid: a.uid,
      profileImageUrl: a.profileImageUrl,
      fullName: a.fullName,
      personalEmail: a.personalEmail,
      createdAt: a.createdAt,
      type: a.type,
    };
    return {
      success: true,
      data: {
        user: filtered,
      },
    };
  };

  getPrivateUserWithStudent = async (
    uid: string
  ): Promise<UserWithStudent | null> => {
    const res = await userRepository.useAggregationPipeline([
      ...aggregations.private.user(uid),
      ...aggregations.public.student(),
      ...aggregations.public.education(),
    ]);
    if (res.length) {
      return res[0] as UserWithStudent;
    } else {
      return null;
    }
  };

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

  signUp = async (
    fullName: string,
    email: string,
    accountType: string,
    username: string,
    lang: string = "en"
  ): Promise<
    UseCaseResult<{ mailResponse: AxiosResponse<any, any> | undefined }>
  > => {
    const userFromEmail = await userRepository.findOne({
      personalEmail: email,
    });
    const userFromUsername = await userRepository.findWithUsername(username)
    if (userFromEmail) {
      return {
        success: false,
        message: "Email may be used by another user.",
        httpStatus: 406,
      };
    }
    if (userFromUsername) {
      return {
        success: false,
        message: "Username may be used by another user.",
        httpStatus: 406,
      };
    }
    let redisKey = `signup:${sha256(email)}`;
    await redis.set(
      redisKey,
      JSON.stringify({
        fullName,
        email,
        accountType,
        username,
      }),
      appConfig.expirations.verificationEmail.s
    );
    const mailResponse = await mailService.sendVerificationEmail(email, lang, {
      code: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${p.signUpVerification}?vssid=${redisKey}`,
      name: fullName,
    });
    return {
      success: true,
      message: "",
      data: {
        mailResponse,
      },
    };
  };

  activateSignUp = async (redisKey: string) => {
    if (!checkRedisTopic(redisKey, "signup")) {
      return false;
    }
    const strValue = await redis.get(redisKey);
    const signupDetail = JSON.parse(strValue) as SignupCacheSchema;
    const newUser: User = {
      uid: sha256(
        signupDetail.email +
          signupDetail.fullName +
          sha256(signupDetail.accountType)
      ),
      orgId: "",
      username: signupDetail.username,
      type: signupDetail.accountType,
      fullName: signupDetail.fullName,
      appQuota: appConfig.INIT_MAX_APP_QUOTA,
      signinSignature: sha256(signupDetail.email),
      personalEmail: signupDetail.email,
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
        },
      },
    };
    await userRepository.create(newUser);
    await redis.delete(redisKey);
    return true;
  };
}

export const userUsecase = new UserUsecase();
