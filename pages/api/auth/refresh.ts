import { NextApiRequest, NextApiResponse } from "next";
import { myKUService } from "../../../api/bridge/mykuService";
import { RenewMiddleware } from "../../../api/middlewares/renew.middleware";
import { createResponse } from "../../../api/types/response";
import { signAuthObject } from "../../../libs/jwt";

const refreshHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
export default refreshHandler;
