import { NextApiRequest, NextApiResponse } from "next";
import { myKUService } from "../../../api/bridge/mykuService";
import { createResponse } from "../../../api/types/response";
import { applicationUsecase, userUsecase } from "../../../api/usecases";
import * as crypto from "crypto";
import { signAuthObject } from "../../../libs/jwt";
import { redirectToAuthenticateCallback } from "../../../api/utils/callback";
import { handleApiError } from "../../../api/error";
import { MyKULoginResponse } from "../../../api/types/myku/auth";
import { ExtractFilter } from "../../../api/types/data/user";

const extractFromSigninResponse = (obj: MyKULoginResponse): ExtractFilter => {
  return obj.user.student;
};

const signinHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).send({});
    }
    const { username, password, clientId, scope, ref, dev, secret } = req.body;

    const app = await applicationUsecase.findOneApp({ clientId: clientId });

    if (app === null || !app?.clientId) {
      return res.status(400).send({});
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
      const user = await userUsecase.findOne({
        stdId: externalLoginResult.stdId,
        stdCode: externalLoginResult.stdId,
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
        await userUsecase.create({
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
      return res.status(200).send(response);
    }
  } catch (error) {
    handleApiError(res, error);
  }
};
export default signinHandler;
