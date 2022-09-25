import { NextApiRequest, NextApiResponse } from "next";
import { MiddlewareOutput } from ".";
import { verify } from "../../libs/jwt";
import { AccessTokenBody, AuthenticationObject } from "../types/auth";
import { createResponse } from "../types/response";
import { jsonCookie } from "../utils/cookie";

export const AuthMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse
): MiddlewareOutput<AccessTokenBody> => {
  const { cookie } = req.headers;
  if (!cookie) {
    res
      .status(401)
      .send(createResponse(false, `Unauthorized: No cookie provided`, {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", clientId: "", uid: "" },
      error: "Unauthorized: No cookie provided",
    };
  }
  const c = jsonCookie(cookie);
  if (!c.access) {
    res.status(401).send(createResponse(false, "Unauthorized", {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", clientId: "", uid: "" },
    };
  }

  const [success, payload, error] = verify(c.access);
  if (!success) {
    res.status(401).send(createResponse(false, `${error}`, {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", clientId: "", uid: "" },
      error: error,
    };
  }

  if (payload.type !== "access") {
    res.status(401).send(createResponse(false, `Unauthorized: Invalid token type`, {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", clientId: "", uid: "" },
      error: "Invalid token type",
    };
  }
  let output: AccessTokenBody = {
    accessToken: "",
    scope: "",
    clientId: "",
    uid: "",
  };
  output.scope = payload?.scope;
  output.clientId = payload?.clientId;
  output.uid = payload?.uid;
  return { success: true, payload: output, error };
};

