import { appConfig } from "./../config/app";
import { NextApiRequest, NextApiResponse } from "next";
import { signAuthObject, verify } from "../../libs/jwt";
import { userRepository } from "../repositories/user";
import { createResponse } from "../utils/response";
import { createAnonymousIdentity, sha256 } from "../utils/crypto";

class AuthUsecase {
  exchangeHandler: {
    [key: string]: (payload: any, ...args: any[]) => boolean;
  } = {
    authorization_code: this.exchangeAuthorizationCode,
  };

  codeChallengeMethod: { [key: string]: (payload: string) => string } = {
    SHA256: sha256,
  };

  private exchangeAuthorizationCode(payload: any, ...args: any[]) {
    if (payload.pkce === true) {
      const challenge = this.codeChallengeMethod[payload.code_challenge_method];
      const hashed = challenge(args[0]);
      return hashed === payload.code_challenge;
    } else {
      return true;
    }
  }

  signAuthCode = (authObject: {
    uid: string;
    scope: string;
    clientId: string;
    pkce: boolean;
    response_type: string;
    code_challenge: string;
    code_challenge_method: string;
  }): string => {
    const {
      response_type,
      uid,
      scope,
      clientId,
      code_challenge,
      code_challenge_method,
    } = authObject;
    const authorizationCode = signAuthObject(
      {
        response_type,
        uid,
        scope,
        clientId,
        code_challenge,
        code_challenge_method,
      },
      "1m"
    );
    return authorizationCode;
  };

  exchangeOAuthTokenWithServerSideCookie = async (
    res: NextApiResponse,
    authCode: string
  ) => {
    const [success, payload, error] = verify(authCode);

    const verified = this.verifyExchangeCode(res, success, payload, error);

    if (!verified) {
      return;
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
      .send(createResponse(true, "Authorized", null));
  };

  exchangeOAuthToken = (
    res: NextApiResponse,
    authCode: string,
    cookie: boolean
  ) => {
    const [success, payload, error] = verify(authCode);

    const verified = this.verifyExchangeCode(res, success, payload, error);

    if (!verified) {
      return;
    }

    if (cookie) {
      const accessToken = signAuthObject(
        {
          type: "access",
          uid: payload.uid,
          scope: payload.scope,
          clientId: payload.clientId,
        },
        "7d"
      );

      return res
        .status(200)
        .setHeader("Set-Cookie", [
          `access=${accessToken}; HttpOnly; SameSite=None; Max-Age=604100; Path=/; Secure`,
        ]) // Expire in almost 7 days.
        .setHeader("Access-Control-Allow-Credentials", "true")
        .setHeader("Access-Control-Allow-Headers", "Set-Cookie")
        .send(createResponse(true, "Authorized", null));
    } else {
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
        "14d"
      );

      return res.status(200).send(
        createResponse(true, "Token exchange success", {
          access_token: accessToken,
          refresh_token: refreshToken,
        })
      );
    }
  };

  public verifyExchangeCode(
    res: NextApiResponse,
    success: boolean,
    payload: any,
    error: any
  ) {
    if (!success) {
      res.status(401).send(createResponse(false, error.toString(), null));
      return false;
    }
    if (
      !payload.uid ||
      !payload.scope ||
      !payload.clientId ||
      !payload.response_type
    ) {
      res.status(401).send(createResponse(false, "Payload malformed", null));
      return false;
    }
    if (!appConfig.grantTypes.includes(payload.response_type)) {
      res
        .status(422)
        .send(createResponse(false, "response_type is not allowed", null));
      return false;
    }

    const challengeHandler = this.exchangeHandler[payload.response_type];

    if (challengeHandler !== undefined && !challengeHandler(payload)) {
      res
        .status(422)
        .send(createResponse(false, "Code challenge failed", null));
      return false;
    }
    return true;
  }
}
export const authUsecase = new AuthUsecase();
