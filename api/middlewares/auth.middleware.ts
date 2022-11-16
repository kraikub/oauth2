import { redis } from "./../../data/redis/index";
import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "../../libs/jwt";
import { createResponse } from "../utils/response";

export const AuthMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AuthMiddleWare> => {
  const { authorization } = req.headers;
  if (authorization) {
    const accessToken = authorization.split("Bearer ")[1];
    return await verifyAccessTokenFromAuthorizationHeader(accessToken, res);
  } else {
    res.status(401).send(createResponse(false, `No access token provided`, {}));
    return {
      success: false,
      session: undefined,
      error: "Unauthorized",
    };
  }
};

async function verifyAccessTokenFromAuthorizationHeader(
  token: string,
  res: NextApiResponse
): Promise<AuthMiddleWare> {
  if (!token) {
    res.status(401).send(createResponse(false, "Unauthorized", {}));
    return {
      success: false,
      session: undefined,
    };
  }

  const [success, payload, error] = verify(token);
  if (!success) {
    res.status(401).send(createResponse(false, `${error}`, {}));
    return {
      success: false,
      session: undefined,
      error: error,
    };
  }

  if (payload.token_type !== "access_token") {
    res
      .status(401)
      .send(createResponse(false, `Unauthorized: Invalid token type`, {}));
    return {
      success: false,
      session: undefined,
      error: "Invalid token type",
    };
  }

  // Check session status
  const session = await redis.get(payload.ssid);
  if (!session) {
    res
      .status(401)
      .send(
        createResponse(
          false,
          `Unauthorized: Invalid session or session exipred`,
          null
        )
      );
    return {
      success: false,
      session: undefined,
      error: "Invalid session or session exipred",
    };
  }

  return { success: true, session: JSON.parse(session), error };
}
