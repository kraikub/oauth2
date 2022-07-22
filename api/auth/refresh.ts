import { NextApiRequest, NextApiResponse } from "next";
import { signAuthObject } from "../../libs/jwt";
import { RenewMiddleware } from "../middlewares/renew.middleware";
import { myKUService } from "../bridge/mykuService";
import { createResponse } from "../types/response";

export async function handleRenewAccessToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessTokenPayload, refreshTokenPayload, success } = RenewMiddleware(
    req,
    res
  );
  if (!success) return;
  const { status, data } = await myKUService.renew(
    accessTokenPayload.accessToken,
    refreshTokenPayload.refreshToken
  );

  if (status === 401) {
    return res.status(status).send(createResponse(false, "Unauthorized", {}));
  }
  accessTokenPayload.accessToken = data.accesstoken;
  const signedJwt = signAuthObject(
    {
      accessTokenPayload,
    },
    "29m"
  );

  res.status(200).send(
    createResponse(true, "New access token", {
      accesssToken: signedJwt,
    })
  );
}
