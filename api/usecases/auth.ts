import { logRepository } from './../repositories/log';
import { userRepository } from "./../repositories/user";
import { redis } from "./../../data/redis/index";
import { applicationRepository } from "./../repositories/application";
import { appConfig } from "./../config/app";
import { NextApiRequest, NextApiResponse } from "next";
import { signAuthObject, verify } from "../../libs/jwt";

import { createResponse } from "../utils/response";
import { random, sha256 } from "../utils/crypto";
import { Scope } from "../../data/models/scope";

interface ExchangeOAuthTokenExtraParams {
  code_verifier?: string;
  client_id?: string;
  client_secret?: string;
}

const codeChallengeMethod: { [key: string]: (payload: string) => string } = {
  SHA256: sha256,
};

class AuthUsecase {
  exchangeHandler: {
    [key: string]: (payload: any, ...args: any[]) => boolean;
  } = {
    code: this.exchangeAuthorizationCode,
  };

  exchangeAuthorizationCode(payload: any, ...args: any[]) {
    if (payload.code_challenge) {
      if (!args[0]) {
        return false;
      }
      const challenge = codeChallengeMethod[payload.code_challenge_method];
      const hashed = challenge(args[0]);
      return hashed === payload.code_challenge;
    } else {
      return true;
    }
  }

  async saveLog(uid: string, clientId: string, scope: string) {
    return logRepository.newLog(uid, clientId, scope);
  }

  signInternalAccessToken(authObject: { uid: string }) {
    return signAuthObject(
      {
        uid: authObject.uid,
        token_type: "internal-service-access-token",
      },
      "14d"
    );
  }

  signAuthCode = (authObject: {
    uid: string;
    scope: string;
    client_id: string;
    pkce: boolean;
    response_type: string;
    code_challenge: string;
    code_challenge_method: string;
  }): string => {
    const {
      response_type,
      uid,
      scope,
      client_id,
      code_challenge,
      code_challenge_method,
    } = authObject;
    const authorizationCode = signAuthObject(
      {
        response_type,
        uid,
        scope,
        client_id,
        code_challenge,
        code_challenge_method,
      },
      "100m"
    );
    return authorizationCode;
  };

  exchangeOAuthToken = async (
    req: NextApiRequest,
    res: NextApiResponse,
    authCode: string,
    extraParams: ExchangeOAuthTokenExtraParams
  ) => {
    const [success, payload, error] = verify(authCode);

    const verified = await this.verifyExchangeCode(
      res,
      success,
      payload,
      error,
      extraParams
    );

    if (!verified) {
      return;
    }

    const ssid = sha256(authCode);

    const { accessToken, refreshToken } = this.newTokenPair(ssid);

    const session = await redis.get(ssid);
    if (session) {
      return res
        .status(401)
        .send(
          createResponse(
            false,
            "Authorization code is used by another session",
            null
          )
        );
    }
    await redis.set(
      ssid,
      JSON.stringify({
        uid: payload.uid,
        scope: payload.scope,
        clientId: payload.client_id,
        createdAt: Math.floor(Date.now() / 1000),
        refreshedAt: 0,
        refreshToken: refreshToken,
      }),
      60 * 60 * 24 * 14
    );

    const responsePayload: any = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: appConfig.expirations.accessToken.s - 2,
    };

    const requestScope = new Scope(payload.uid, payload.scope);

    if (requestScope.isOpenIDConnect) {
      const result = await userRepository.useAggregationPipeline(
        requestScope.baseAggregation
      );
      if (!result.length) {
        return res
          .status(409)
          .send(
            createResponse(
              false,
              "JWT state not matched with the server state.",
              {}
            )
          );
      }
      const idtoken = this.signNewIdtoken({
        iss: appConfig.openid.iss,
        iat: Math.round(Date.now() / 1000),
        aud: payload.client_id,
        sub: `openid:${payload.uid}`,
        ...result[0],
      });
      responsePayload.id_token = idtoken;

      return res
        .status(200)
        .send(createResponse(true, "Token exchange success", responsePayload));
    }
  };

  public async refreshAccessToken(res: NextApiResponse, refreshToken: string) {
    const [success, payload, error] = verify(refreshToken);
    if (!success) {
      res.status(401).send(createResponse(false, error.toString(), null));
    }
    if (payload.token_type !== "refresh_token" || !payload.ssid) {
      return res
        .status(401)
        .send(createResponse(false, "Invalid refresh token", null));
    }

    // Generate new access token and refresh token pair.

    const { accessToken: acc, refreshToken: ref } = this.newTokenPair(
      payload.ssid
    );

    // Handle Redis operations.

    const s = await redis.get(payload.ssid);

    if (!s) {
      return res
        .status(401)
        .send(createResponse(false, "Session not existed", null));
    }

    const session: Session = JSON.parse(s);

    if (!session) {
      // Kill session due to the abnormal opreations in Redis DB.
      await redis.delete(payload.ssid);
      return res
        .status(401)
        .send(
          createResponse(
            false,
            "Session has been killed due to the abnormal operation.",
            null
          )
        );
    }

    if (session.refreshToken !== refreshToken) {
      return res
        .status(401)
        .send(createResponse(false, "Invalid refresh token", null));
    }

    // Assign new refresh token to the session info.
    session.refreshToken = ref;
    (session.refreshedAt = Math.floor(Date.now() / 1000)),
      // Save new session info.
      await redis.set(payload.ssid, JSON.stringify(session), appConfig.expirations.refreshToken.s);

    return res.status(200).send(
      createResponse(true, "Token exchange success", {
        access_token: acc,
        refresh_token: ref,
        expires_in: appConfig.expirations.accessToken.s - 2,
      })
    );
  }

  public signNewIdtoken(payload: any) {
    return signAuthObject(payload, appConfig.expirations.idtoken.str);
  }

  public newTokenPair(ssid: string) {
    const accessToken = signAuthObject(
      {
        token_type: "access_token",
        ssid: ssid,
      },
      appConfig.expirations.accessToken.str
    );

    const refreshToken = signAuthObject(
      {
        token_type: "refresh_token",
        ssid: ssid,
      },
      appConfig.expirations.refreshToken.str
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public async verifyExchangeCode(
    res: NextApiResponse,
    success: boolean,
    payload: any,
    error: any,
    extraParams: ExchangeOAuthTokenExtraParams
  ) {
    if (!success) {
      res.status(401).send(createResponse(false, error.toString(), null));
      return false;
    }

    if (
      !payload.uid ||
      !payload.scope ||
      !payload.client_id ||
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

    if (
      !challengeHandler ||
      (challengeHandler !== undefined &&
        !challengeHandler(payload, extraParams.code_verifier))
    ) {
      res
        .status(422)
        .send(createResponse(false, "Code challenge failed", null));
      return false;
    }
    return true;
  }
}
export const authUsecase = new AuthUsecase();
