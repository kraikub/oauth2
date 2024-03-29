import { studentRepository } from "./../../../api/repositories/student";
import { mailService } from "./../../../api/mail/index";
import { redis } from "./../../../data/redis/index";
import {
  generateSixDigitCode,
  makeid,
  sha256,
} from "./../../../api/utils/crypto";
import { PrivateAuthMiddleware } from "./../../../api/middlewares/private.middleware";
import { appConfig } from "./../../../api/config/app";
import { NextApiRequest, NextApiResponse } from "next";
import { bridge } from "../../../api/bridge/bridge";
import { createResponse } from "../../../api/utils/response";
import { applicationUsecase, userUsecase } from "../../../api/usecases";
import {
  hasRedirect,
  redirectToAuthenticateCallback,
} from "../../../api/utils/callback";
import { handleApiError } from "../../../api/error";
import {
  calculateUid,
  createAnonymousIdentity,
} from "../../../api/utils/crypto";
import { authUsecase } from "../../../api/usecases/auth";
import requestIp from "request-ip";
import axios from "axios";
import { deviceMap } from "../../../src/views/kraikub-id/components/DevicesCard";
import { unixNow } from "../../../src/utils/time";

const signinHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).send({});
    }
    const detectedIp = requestIp.getClientIp(req);
    const uaPlatform = req.headers["sec-ch-ua-platform"];
    const uaMobile = req.headers["sec-ch-ua-mobile"];
    const ua = req.headers["user-agent"];

    const {
      signin_method,
      username,
      password,
      clientId,
      scope,
      state,
      secret,
      sig,
      redirect_uri,
      response_type,
      otp,
      email,
      /// These below are used for PKCE
      code_challenge,
      code_challenge_method, // SHA256
    } = req.body;

    const app = await applicationUsecase.findOneApp({ clientId: clientId });

    // Please handles method's params and query before doing any operation.
    if (
      // No App matched
      app === null ||
      // No App's Client ID
      !app?.clientId ||
      // No user's signature
      !sig ||
      // Grant type not allowed
      !appConfig.grantTypes.includes(response_type)
    ) {
      return res.status(400).send(createResponse(false, "Bad request", null));
    }
    // For handling PKCE
    if (
      response_type === "code" &&
      code_challenge &&
      !appConfig.codeChallengeMethod.includes(code_challenge_method)
    ) {
      return res
        .status(400)
        .send(
          createResponse(false, "Bad request, Invalid code challenge", null)
        );
    }
    let uid: string;
    let user: User | null;

    if (signin_method === "credential") {
      const { success, payload, error } = PrivateAuthMiddleware(req, res);
      if (!success || !payload) {
        return;
      }
      uid = payload.uid;
      // Check if user is existed or not.
      user = await userUsecase.findOne({
        uid: uid,
      });
    } else if (signin_method === "nontri") {
      // Login to myku
      const authResponse = await bridge.login(username, password);
      const { stdId, stdCode } = authResponse.data.user.student;
      uid = calculateUid(stdId, stdCode);

      // Check if user is existed or not.
      user = await userUsecase.findOne({
        uid: uid,
      });

      if (user === null) {
        // Handle create new user.
        const { user: newUser } = await userUsecase.initUserProfile(
          uid,
          stdId,
          sig,
          authResponse.data
        );
        user = newUser;
      }
    } else if (signin_method === "kraikubid") {
      const queriedUser = await userUsecase.findOne({ personalEmail: email });
      if (!queriedUser) {
        return res
          .status(400)
          .send(createResponse(false, "Provided email not found.", null));
      }
      user = queriedUser;
      uid = queriedUser.uid;
    } else {
      return res
        .status(400)
        .send(createResponse(false, "signin_method not allowed.", null));
    }
    // Sign the authorization code for each auth method.
    const code = authUsecase.signAuthCode({
      uid,
      scope,
      client_id: clientId,
      response_type: response_type,
      pkce: code_challenge && code_challenge_method,
      code_challenge,
      code_challenge_method,
    });

    let selectedUrl = "";
    const httpRegex = new RegExp("^http?://");
    const httpsRegex = new RegExp("^https?://");

    if (
      httpsRegex.test(redirect_uri) &&
      hasRedirect(redirect_uri, app.redirects)
    ) {
      selectedUrl = redirect_uri;
    } else if (
      httpRegex.test(redirect_uri) &&
      app.secret === secret &&
      hasRedirect(redirect_uri, app.redirects)
    ) {
      selectedUrl = redirect_uri;
    } else {
      return res
        .status(406)
        .send(createResponse(false, "redirect_uri not acceptable", null));
    }

    // handle two factor authentication
    if (user?.personalEmail) {
      if (!otp) {
        const student = await studentRepository.findOne({ uid });
        const otpCode = generateSixDigitCode().toString();
        const otpRef = makeid(8);
        await redis.set(
          `2fa:${uid}`,
          otpCode,
          appConfig.expirations.verificationEmail.s
        );
        try {
          await mailService.sendOTP(
            user.personalEmail,
            req.cookies.LANG || "en",
            {
              code: otpCode,
              name:
                req.cookies.LANG === "th" ? student?.nameTh : student?.nameEn,
              ref: otpRef,
              deviceName: deviceMap(ua || "", (uaPlatform as string) || ""),
            }
          );
          return res.status(200).send(
            createResponse(false, "Require 2fa", {
              email: user?.personalEmail,
              otp_ref: otpRef,
              otp_expire:
                unixNow() + appConfig.expirations.verificationEmail.s - 5,
            })
          );
        } catch (error: any) {
          // If mail service calling failed.
          if (axios.isAxiosError(error)) {
            console.error(error.code, error.message, error.status);
            return res.status(500).send(
              createResponse(false, "Mail service connection refused.", {
                error: error,
              })
            );
          } else {
            throw new Error(error);
          }
        }
      } else {
        const verifiedOtp = await redis.get(`2fa:${uid}`);
        if (otp !== verifiedOtp) {
          return res
            .status(400)
            .send(createResponse(false, "Invalid otp", null));
        }
        await redis.set(`2fa:${uid}`, "");
      }
    }

    let redirectQueries = {}

    if (response_type === "implicit") {
      const idtoken = await authUsecase.getIdTokenOnImplicit(
        uid,
        scope,
        clientId
      );
      if (!idtoken) {
        return res
            .status(409)
            .send(createResponse(false, "Error on generating id_token", null));
      }
      redirectQueries = {
        state: state,
        id_token: idtoken,
        scope: scope,
        client_id: clientId,
      }
    } else if (response_type === "code") {
      redirectQueries = {
        state: state,
        code: code,
        scope: scope,
        client_id: clientId,
      }
    }


    const redirectUrl = redirectToAuthenticateCallback(
      selectedUrl,
      redirectQueries
    );

    let payload = {
      url: redirectUrl,
      code: code,
    };
    const ssid = sha256(code);
    await authUsecase.saveLog(
      ssid,
      uid,
      clientId,
      scope,
      ua,
      Array.isArray(uaPlatform) ? uaPlatform.join(" ") : uaPlatform,
      Array.isArray(uaMobile) ? uaMobile.join(" ") : uaMobile,
      detectedIp || ""
    );

    const internalServiceAccessToken = authUsecase.signInternalAccessToken({
      uid,
      ssid,
    });

    const response = createResponse(true, "Authorized", payload);

    return res
      .status(200)
      .setHeader("Set-Cookie", [
        `access=${internalServiceAccessToken}; HttpOnly; Domain=${
          process.env.SHARE_ACCESS_DOMAIN || req.headers.origin
        }; Max-Age=604100; Path=/; Secure`,
      ]) // Expire in almost 7 days.
      .setHeader("Access-Control-Allow-Credentials", "true")
      .setHeader("Access-Control-Allow-Headers", "Set-Cookie")
      .send(response);
  } catch (error: any) {
    handleApiError(res, error);
  }
};
export default signinHandler;
