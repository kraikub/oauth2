import { applicationUsecase } from "./../../../../api/usecases/application";
import { appConfig } from "./../../../../api/config/app";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { handleApiError } from "../../../../api/error";
import { createResponse } from "../../../../api/utils/response";
import { authUsecase } from "../../../../api/usecases/auth";

const handleOAuthExchangeAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["POST"],
      origin: req.headers.origin,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "POST") {
      const {
        code,
        client_id,
        client_secret,
        grant_type,
        code_verifier,
        refresh_token,
      } = req.body;
      const app = await applicationUsecase.findOneApp({ clientId: client_id });
      if (!app || app.secret !== client_secret) {
        res
          .status(401)
          .send(createResponse(false, "Invalid requested app.", null));
        return false;
      }
      if (grant_type === "authorization_code") {
        if (!code) {
          return res
            .status(400)
            .send(createResponse(false, "Require authorization_code", null));
        }

        return await authUsecase.exchangeOAuthToken(req, res, code as string, {
          code_verifier,
          client_id,
          client_secret,
        });
      } else if (grant_type === "refresh_token") {
        if (!refresh_token) {
          return res
            .status(400)
            .send(createResponse(false, "Require refresh_token", null));
        }
      } else {
        return res
          .status(400)
          .send(createResponse(false, "Invalid grant_type", null));
      }
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleOAuthExchangeAPI;
