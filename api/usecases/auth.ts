import { NextApiRequest, NextApiResponse } from "next";
import { signAuthObject, verify } from "../../libs/jwt";
import { userRepository } from "../repositories/user";
import { createResponse } from "../types/response";
import { createAnonymousIdentity } from "../utils/crypto";

class AuthUsecase {
  getDataWithScope = (uid: string, scope: number) => {};

  signCToken = (uid: string, scope: string, clientId: string): string => {
    const accessToken = signAuthObject(
      {
        type: "code",
        uid: uid,
        scope: scope,
        clientId: clientId,
      },
      "30s"
    );
    return accessToken;
  };

  claimAccessToken = async (res: NextApiResponse, ctoken: string) => {
    const [sucess, payload, error] = verify(ctoken);
    if (!sucess) {
      return res
        .status(401)
        .send(createResponse(false, error.toString(), null));
    }
    if (!payload.uid || !payload.scope || !payload.clientId) {
      return res
        .status(401)
        .send(createResponse(false, "Payload malformed", null));
    }
    if (payload.type !== "code") {
      return res
        .status(422)
        .send(createResponse(false, "Token type is not allowed", null));
    }
    const accessToken = signAuthObject(
      {
        type: "access",
        uid: payload.uid,
        scope: payload.scope,
        clientId: payload.clientId,
      },
      "1d"
    );

    return res
      .status(200)
      .setHeader("Set-Cookie", [
        `access=${accessToken}; HttpOnly; SameSite=None; Max-Age=86100; Path=/; Secure`,
      ]) // Expire in almost 24 hr.
      .setHeader("Access-Control-Allow-Credentials", "true")
      .setHeader("Access-Control-Allow-Headers", "Set-Cookie")
      .send(
        createResponse(true, "Authorized", null)
      );
  };

  exchangeOAuthToken = (res: NextApiResponse, authCode: string) => {
    const [sucess, payload, error] = verify(authCode);
    if (!sucess) {
      return res
        .status(401)
        .send(createResponse(false, error.toString(), null));
    }
    if (!payload.uid || !payload.scope || !payload.clientId) {
      return res
        .status(401)
        .send(createResponse(false, "Payload malformed", null));
    }
    if (payload.type !== "code") {
      return res
        .status(422)
        .send(createResponse(false, "Token type is not allowed", null));
    }
    const accessToken = signAuthObject(
      {
        type: "access",
        uid: payload.uid,
        scope: payload.scope,
        clientId: payload.clientId,
      },
      "60m"
    );

    const refreshToken = signAuthObject(
      {
        type: "refresh",
        uid: payload.uid,
        scope: payload.scope,
        clientId: payload.clientId,
      },
      "4d"
    )

    return res.status(200).send(createResponse(true, "Token exchange success", {
      access_token: accessToken,
      refresh_token: refreshToken,
    }))
  }
}
export const authUsecase = new AuthUsecase();
