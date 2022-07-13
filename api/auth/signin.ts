import type { NextApiRequest, NextApiResponse } from "next";
import { ApplicationModel } from "../../db/models/application";
import { mongodb } from "../../db/mongodb";
import { Application } from "../../db/schema/application";
import { signAuthObject } from "../../libs/jwt";
import { handleApiError } from "../error";
import { myKUService } from "../services/mykuService";
import { createResponse } from "../types/response";
import { redirectToAuthenticateCallback } from "../utils/callback";

export async function handleSignin(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(400).send({});
      return;
    }
    await mongodb.connect();
    const { username, password, clientId, scope, ref } = req.body;

    const app = await ApplicationModel.findOne<Application>({
      clientId: clientId,
    });

    if (app === null || !app?.clientId) {
      res.status(400).send({});
      return;
    }

    const externalLoginResult = await myKUService.externalLogin(
      username,
      password,
      scope,
      app.clientId
    );

    if (externalLoginResult === null) {
      const response = createResponse(
        false,
        "Failed connected with apimy.ku.th",
        null
      );
      return res.status(400).send(response);
    } else {
      const { accessToken, refreshToken, scope, clientId, stdId, stdCode } =
        externalLoginResult;
      const signedAuthJwtToken = signAuthObject({
        accessToken,
        scope,
        clientId,
        stdId,
        stdCode,
      }, "29m");
      const signedRenewJwtToken = signAuthObject({ refreshToken }, "1h");
      const redirectUrl = redirectToAuthenticateCallback(app.redirectUrl, {
        ref: ref,
        access: signedAuthJwtToken,
        refresh: signedRenewJwtToken,
      });
      const response = createResponse(true, "redirect url", {
        url: redirectUrl,
      });
      res.status(200).send(response);
    }
  } catch (error) {
    handleApiError(res, error);
  }
}
