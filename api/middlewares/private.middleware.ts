import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "../../libs/jwt";
import { createResponse } from "../utils/response";
import { jsonCookie } from "../utils/cookie";

export const PrivateAuthMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse
): PrivateAuthMiddleWare => {
  const { cookie } = req.headers;
  if (cookie) {
    return verifyAccessTokenFromCookieHeader(cookie, res);
  } else {
    res.status(401).send(createResponse(false, `No access token provided`, {}));
    return {
      success: false,
      payload: undefined,
      error: "Unauthorized: No access token provided",
    };
  }
};

function verifyAccessTokenFromCookieHeader(
  cookie: string,
  res: NextApiResponse
): PrivateAuthMiddleWare {
  const c = jsonCookie(cookie);
  if (!c.access) {
    res.status(401).send(createResponse(false, "Unauthorized", {}));
    return {
      success: false,
      payload: undefined,
    };
  }

  const [success, payload, error] = verify(c.access);
  if (!success) {
    res.status(401).send(createResponse(false, `${error}`, {}));
    return {
      success: false,
      payload: undefined,
      error: error,
    };
  }

  if (payload.token_type !== "internal-service-access-token") {
    res
      .status(401)
      .send(createResponse(false, `Unauthorized: Invalid token type`, {}));
    return {
      success: false,
      payload: undefined,
      error: "Invalid token type",
    };
  }

  if (!payload.uid) {
    res
      .status(401)
      .send(createResponse(false, `Unauthorized: Invalid token uid`, {}));
    return {
      success: false,
      payload: undefined,
      error: "Invalid token uid",
    };
  }
  
  return { success: true, payload: payload, error };
}