import { NextApiResponse } from "next";
import { signAuthObject, verify } from "../../libs/jwt";
import { userRepository } from "../repositories/user";
import { createResponse } from "../types/response";
import { createAnonymousIdentity } from "../utils/crypto";

class AuthUsecase {
  getDataWithScope = (uid: string, scope: number) => {};

  signCToken = (uid: string, scope: string, clientId: string): string => {
    const accessToken = signAuthObject(
      {
        type: "ctoken",
        uid: uid,
        scope: scope,
        clientId: clientId,
      },
      "1m"
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
    if (payload.type !== "ctoken") {
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
    let u = await userRepository.getUserWithStudent(payload.uid);

    return res
      .status(200)
      .setHeader("Set-Cookie", [
        `access=${accessToken}; HttpOnly; Max-Age=86100; Path=/`,
      ]) // Expire in almost 24 hr.
      .send(
        createResponse(true, "Authorized", {
          user: { 
            ...u,
            uid: payload.uid,
          },
        })
      );
  };
}
export const authUsecase = new AuthUsecase();
