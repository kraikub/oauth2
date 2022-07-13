import { NextApiRequest, NextApiResponse } from "next";
import { MiddlewareOutput } from ".";
import { verify } from "../../libs/jwt";
import { AccessTokenBody, AuthenticationObject } from "../types/auth.response";
import { createResponse } from "../types/response";

export const AuthMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse
): MiddlewareOutput<AccessTokenBody> => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send(createResponse(false, "Unauthorized", {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", stdId: "", clientId: "", stdCode: "" },
    };
  }
  const token = authorization.split(" ")[1];

  const [success, payload, error] = verify(token);
  if (!success) {
    res.status(401).send(createResponse(false, `Unauthorized: ${error}`, {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", stdId: "", clientId: "", stdCode: "" },
    };
  }
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
  return { success: true, payload: output };
};
