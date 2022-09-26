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
    const { username, password, clientId, scope, ref, dev, secret, sig } = req.body;

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
    if (dev) {
      // verifySecret
      if (app.secret === secret) {
        selectedUrl = app.devCallbackUrl;
      } else {
        return res
          .status(400)
          .send(
            createResponse(
              false,
              "Fail to authenticate development callbackUrl (devCallbackUrl)",
              null
            )
          );
      }
    } else {
      selectedUrl = app.callbackUrl;
    }
    
    

    const redirectUrl = redirectToAuthenticateCallback(selectedUrl, {
      ref: ref,
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
