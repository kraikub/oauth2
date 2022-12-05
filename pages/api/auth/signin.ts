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
import requestIp from 'request-ip';

const signinHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).send({});
    }
    const detectedIp = requestIp.getClientIp(req)
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
      response_type === "authorization_code" &&
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
    } else {
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
    }

    // If anonymous sign in.
    if (scope === "0") {
      // Recalculate uid for hiding user's identity.
      uid = createAnonymousIdentity(uid, clientId);
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

    const redirectUrl = redirectToAuthenticateCallback(selectedUrl, {
      state: state,
      code: code,
      scope: scope,
      clientId: clientId,
    });

    let payload = {
      url: redirectUrl,
      code: code,
    };

    const logResult = await authUsecase.saveLog(
      uid,
      clientId,
      scope,
      ua,
      Array.isArray(uaPlatform) ? uaPlatform.join(" ") : uaPlatform,
      Array.isArray(uaMobile) ? uaMobile.join(" ") : uaMobile,
      detectedIp || "",
    );

    const internalServiceAccessToken = authUsecase.signInternalAccessToken({
      uid,
    });

    const response = createResponse(true, "Authorized", payload);
    return res
      .status(200)
      .setHeader("Set-Cookie", [
        `access=${internalServiceAccessToken}; HttpOnly; Domain=${process.env.SHARE_ACCESS_DOMAIN || req.headers.origin}; Max-Age=604100; Path=/; Secure`,
      ]) // Expire in almost 7 days.
      .setHeader("Access-Control-Allow-Credentials", "true")
      .setHeader("Access-Control-Allow-Headers", "Set-Cookie")
      .send(response);
  } catch (error: any) {
    console.error(error);
    handleApiError(res, error);
  }
};
export default signinHandler;
