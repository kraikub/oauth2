import { NextApiRequest, NextApiResponse } from "next";
import { MiddlewareOutput } from ".";
import { verify } from "../../libs/jwt";
import { AuthenticationObject } from "../types/auth.response";
import { createResponse } from "../types/response";

export const AuthMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse
): MiddlewareOutput<AuthenticationObject> => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send(createResponse(false, "Unauthorized", {}));
    return {success: false, payload: { accessToken: "", scope: "", stdId: "" }};
  }
  const token = authorization.split(" ")[1];

  const [success, payload, error] = verify(token);
  if (!success) {
    res.status(401).send(createResponse(false, `Unauthorized: ${error}`, {}));
    return {success: false, payload: { accessToken: "", scope: "", stdId: "" }};
  }
  let output: AuthenticationObject = { accessToken: "", scope: "", stdId: "" };
  output.accessToken = payload?.accessToken;
  output.scope = payload?.scope;
  output.stdId = payload?.stdId;
  return {success: true, payload: output};
};
