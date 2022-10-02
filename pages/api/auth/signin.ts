import { NextApiRequest, NextApiResponse } from "next";
import { bridge } from "../../../api/bridge/bridge";
import { createResponse } from "../../../api/types/response";
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
import { AuthResponse } from "../../../api/types/auth";
import { publicUserFilter } from "../../../api/utils/filter/public_user";
import { authUsecase } from "../../../api/usecases/auth";

const signinHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).send({});
    }

    const {
      username,
      password,
      clientId,
      scope,
      state,
      dev,
      secret,
      sig,
      redirect_uri,
    } = req.body;

    const app = await applicationUsecase.findOneApp({ clientId: clientId });

    if (app === null || !app?.clientId || !sig) {
      return res.status(400).send(createResponse(false, "Bad request", null));
    }

    // login to myku
    const authResponse = await bridge.login(username, password);
    const { stdId, stdCode } = authResponse.data.user.student;
    let uid = calculateUid(stdId, stdCode);

    let user: User | null = await userUsecase.findOne({
      uid: uid,
    });

    if (user === null) {
      // handle create new user
      const { user: newUser } = await userUsecase.initUserProfile(
        uid,
        stdId,
        sig,
        authResponse.data
      );
      user = newUser;
    }
    if (scope === "0") {
      uid = createAnonymousIdentity(uid, clientId);
    }
    const code = authUsecase.signCToken(uid, scope, clientId);
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

    let payload: AuthResponse = {
      url: redirectUrl,
      code: code,
    };
    const response = createResponse(true, "Authorized", payload);
    return res.status(200).send(response);
  } catch (error: any) {
    console.error(error);
    handleApiError(res, error);
  }
};
export default signinHandler;
