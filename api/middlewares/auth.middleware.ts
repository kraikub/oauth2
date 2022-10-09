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
  const { cookie, authorization } = req.headers;
  if (authorization) {
    const accessToken = authorization.split("Bearer ")[1];
    return verifyAccessTokenFromAuthorizationHeader(accessToken, res);
  } else if (cookie) {
    return verifyAccessTokenFromCookieHeader(cookie, res);
  } else {
    res.status(401).send(createResponse(false, `No access token provided`, {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", clientId: "", uid: "" },
      error: "Unauthorized: No cookie provided",
    };
  }
};

function verifyAccessTokenFromCookieHeader(
  cookie: string,
  res: NextApiResponse
) {
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
    res
      .status(401)
      .send(createResponse(false, `Unauthorized: Invalid token type`, {}));
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
}

function verifyAccessTokenFromAuthorizationHeader(
  token: string,
  res: NextApiResponse
) {
  if (!token) {
    res.status(401).send(createResponse(false, "Unauthorized", {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", clientId: "", uid: "" },
    };
  }

  const [success, payload, error] = verify(token);
  if (!success) {
    res.status(401).send(createResponse(false, `${error}`, {}));
    return {
      success: false,
      payload: { accessToken: "", scope: "", clientId: "", uid: "" },
      error: error,
    };
  }

  if (payload.type !== "access") {
    res
      .status(401)
      .send(createResponse(false, `Unauthorized: Invalid token type`, {}));
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
}
