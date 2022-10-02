import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { handleApiError } from "../../../../api/error";
import { createResponse } from "../../../../api/types/response";
import { authUsecase } from "../../../../api/usecases/auth";

const handleOAuthExchangeAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "POST") {
      const { code } = req.body;
      if (!code) {
        return res
          .status(400)
          .send(createResponse(false, "Require authorization code", null));
      }
      return authUsecase.exchangeOAuthToken(res, code as string);
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleOAuthExchangeAPI;
