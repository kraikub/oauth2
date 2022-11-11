import { NextApiRequest, NextApiResponse } from "next";
import { bridge } from "../../../api/bridge/bridge";
import { RenewMiddleware } from "../../../api/middlewares/renew.middleware";
import { createResponse } from "../../../api/utils/response";
import { signAuthObject } from "../../../libs/jwt";

const refreshHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessTokenPayload, refreshTokenPayload, success } = RenewMiddleware(
    req,
    res
  );
  if (!success) return;
  const { status, data } = await bridge.renew(
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
