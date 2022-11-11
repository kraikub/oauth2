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
      const { code, client_id, client_secret, grant_type, payload_type } =
        req.body;

      if (grant_type !== "authorization_code") {
        return res
          .status(400)
          .send(
            createResponse(
              false,
              "grant_type allow only authorization_code",
              null
            )
          );
      }

      if (!code) {
        return res
          .status(400)
          .send(createResponse(false, "Require authorization code", null));
      }

      if (payload_type && !appConfig.tokenPayloadTypes.includes(payload_type)) {
        return res
          .status(400)
          .send(createResponse(false, "invalid payload_type", null));
      }

      return authUsecase.exchangeOAuthToken(
        res,
        code as string,
        payload_type === "http_cookie"
      );
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleOAuthExchangeAPI;
