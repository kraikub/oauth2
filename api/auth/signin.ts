import type { NextApiRequest, NextApiResponse } from "next";
import { ApplicationModel } from "../../db/models/application";
import { UserModel } from "../../db/models/user";
import { mongodb } from "../../db/mongodb";
import { Application } from "../../db/schema/application";
import { User } from "../../db/schema/user";
import { signAuthObject } from "../../libs/jwt";
import { handleApiError } from "../error";
import { myKUService } from "../bridge/mykuService";
import { createResponse } from "../types/response";
import { redirectToAuthenticateCallback } from "../utils/callback";
import * as crypto from "crypto";
import { AuthenticationObject } from "../types/auth.response";
import { MyKULoginResponse } from "../types/myku/auth";
import { ExtractFilter } from "../types/data/user";

const extractFromSigninResponse = (obj: MyKULoginResponse): ExtractFilter => {
  return obj.user.student;
};

export async function handleSignin(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(400).send({});
      return;
    }
    await mongodb.connect();
    const { username, password, clientId, scope, ref, dev, secret } = req.body;

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
      const user = await UserModel.findOne<User>({
        stdId: externalLoginResult.stdId,
        stdCode: externalLoginResult.stdCode,
      });
      const uid = crypto
        .createHash("sha256")
        .update(externalLoginResult.stdId + externalLoginResult.stdCode)
        .digest("hex");
      if (user === null) {
        // handle new user
        const { status, data: personal } = await myKUService.getProfile(
          externalLoginResult.stdId,
          externalLoginResult.accessToken
        );
        if (status !== 200) {
          const response = createResponse(
            false,
            `Create user failed: myapi.ku_status_${status}`,
            null
          );
          return res.status(400).send(response);
        }
        const extracted = extractFromSigninResponse(
          externalLoginResult.response
        );
        const {
          genderCode,
          genderTh,
          genderEn,
          nameTh,
          nameEn,
          birthDate,
          nationCode,
          nationNameTh,
          nationNameEn,
          religionTh,
          religionEn,
          phone,
          email,
        } = personal.results.stdPersonalModel;
        await UserModel.create<User>({
          ...extracted,
          uid: uid,
          appQuota: 5,
          stdId: externalLoginResult.stdId,
          stdCode: externalLoginResult.stdCode,
          genderCode,
          genderTh,
          genderEn,
          nameTh,
          nameEn,
          birthDate,
          nationCode,
          nationNameTh,
          nationNameEn,
          religionTh,
          religionEn,
          phone,
          email,
        });
      }
      const { accessToken, refreshToken, scope, clientId, stdId, stdCode } =
        externalLoginResult;
      const signedAuthJwtToken = signAuthObject(
        {
          accessToken,
          scope,
          clientId,
          stdId,
          stdCode,
          uid: user ? user.uid : uid,
        },
        "29m"
      );
      const signedRenewJwtToken = signAuthObject({ refreshToken }, "1h");
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
  await mongodb.close();
}
