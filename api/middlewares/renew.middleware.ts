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
        uid: "",
      },
      refreshTokenPayload: { refreshToken: "" },
    };
  }
  const token = authorization.split(" ")[1];

  const [success, payload, error] = verify(token);
  if (!success) {
    res.status(401).send(createResponse(false, `Unauthorized: ${error}`, {}));
    
    return {
      success: false,
      accessTokenPayload: {
        accessToken: "",
        scope: "",
        stdId: "",
        clientId: "",
        stdCode: "",
        uid: "",
      },
      refreshTokenPayload: { refreshToken: "" },
    };
  }
  let output: AccessTokenBody = {
    accessToken: "",
    scope: "",
    stdId: "",
    clientId: "",
    stdCode: "",
    uid: "",
  };
  output.accessToken = payload?.accessToken;
  output.scope = payload?.scope;
  output.stdId = payload?.stdId;
  output.clientId = payload?.clientId;
  output.stdCode = payload?.stdCode;
  output.uid = payload?.uid;

  const { refreshToken } = req.body;

  const [refreshVerifySuccess, refreshPayload, refreshVerifyError] =
    verify(refreshToken);
  if (!refreshVerifySuccess) {
    res
      .status(401)
      .send(createResponse(false, `Unauthorized: ${refreshVerifyError}`, {}));
    return {
      success: false,
      accessTokenPayload: {
        accessToken: "",
        scope: "",
        stdId: "",
        clientId: "",
        stdCode: "",
        uid: "",
      },
      refreshTokenPayload: { refreshToken: "" },
    };
  }
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
