import { NextApiRequest, NextApiResponse } from "next";
import { bridge } from "../../../api/bridge/bridge";
import { createResponse } from "../../../api/types/response";
import { applicationUsecase, userUsecase } from "../../../api/usecases";
import * as crypto from "crypto";
import { signAuthObject } from "../../../libs/jwt";
import { redirectToAuthenticateCallback } from "../../../api/utils/callback";
import { handleApiError } from "../../../api/error";
import { MyKULoginResponse } from "../../../api/types/myku/auth";
import { calculateUid, createAnonymousIdentity } from "../../../api/utils/crypto";
import { AuthResponse } from "../../../api/types/auth";
import { publicUserFilter } from "../../../api/utils/filter/public_user";
import { authUsecase } from "../../../api/usecases/auth";

const signinHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).send({});
    }
    const { username, password, clientId, scope, state, dev, secret, sig, redirect_uri } = req.body;

    const app = await applicationUsecase.findOneApp({ clientId: clientId });

    if (app === null || !app?.clientId || !sig) {
      return res.status(400).send(createResponse(false, "Bad request", null));
    }

    // login to myku
    const authResponse = await bridge.login(username, password);
    const { stdId, stdCode } = authResponse.data.user.student
    let uid = calculateUid(stdId, stdCode)

    let user: User | null = await userUsecase.findOne({
      uid: uid,
    });

    let student: Student | undefined;
    let educations: Education[] | undefined;
    if (user === null) {
      // handle create new user
      const { user: newUser, student: newStudent, educations: newEducations } = await userUsecase.initUserProfile(uid, stdId, sig, authResponse.data)
      user = newUser
    }
    if (scope === "0") {
      uid = createAnonymousIdentity(uid, clientId)
    }
    const ctoken = authUsecase.signCToken(uid, scope, clientId)
    let selectedUrl = "";
    const httpRegex = new RegExp("^http?://")
    const httpsRegex = new RegExp("^https?://")
    if (httpsRegex.test(redirect_uri) && app.redirects.includes(redirect_uri)) {
      selectedUrl = redirect_uri
    }
    else if (httpRegex.test(redirect_uri) && app.secret === secret) {
      selectedUrl = redirect_uri
    }
    else {
      return res.status(406).send(
        createResponse(false, "redirect_uri not acceptable", null)
      )
    }
    
    const redirectUrl = redirectToAuthenticateCallback(selectedUrl, {
      state: state,
      ctoken: ctoken,
      scope: scope,
      clientId: clientId,
    });
    console.log(redirectUrl)

    let payload: AuthResponse = {
      url: redirectUrl,
      ctoken: ctoken,
      user: publicUserFilter(user)
    };
    const response = createResponse(true, "Authorized", payload)
    return res.status(200).send(response);
  } catch (error: any) {
    console.error(error);
    handleApiError(res, error);
  }
};
export default signinHandler;
