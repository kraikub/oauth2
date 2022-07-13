import { NextApiRequest, NextApiResponse } from "next";
import { MiddlewareOutput, RenewMiddlewareOutput } from ".";
import { verify } from "../../libs/jwt";
import { AccessTokenBody, RefreshTokenBody } from "../types/auth.response";
import { createResponse } from "../types/response";

export const RenewMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse
): RenewMiddlewareOutput => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send(createResponse(false, "Unauthorized", {}));
    return {
      success: false,
      accessTokenPayload: {
        accessToken: "",
        scope: "",
        stdId: "",
        clientId: "",
        stdCode: "",
      },
      refreshTokenPayload: { refreshToken: "" },
    };
  }
  const token = authorization.split(" ")[1];

  const [success, payload, error] = verify(token);
  let output: AccessTokenBody = {
    accessToken: "",
    scope: "",
    stdId: "",
    clientId: "",
    stdCode: "",
  };
  output.accessToken = payload?.accessToken;
  output.scope = payload?.scope;
  output.stdId = payload?.stdId;
  output.clientId = payload?.clientId;
  output.stdCode = payload?.stdCode;

  const { refreshToken } = req.body;

  const [, refreshPayload] = verify(refreshToken);
  let refresh: RefreshTokenBody = {
    refreshToken: "",
  };
  refresh.refreshToken = refreshPayload?.refreshToken;

  return {
    success: true,
    accessTokenPayload: output,
    refreshTokenPayload: refresh,
    error: error,
  };
};
