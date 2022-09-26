import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { AuthMiddleware } from "../../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../../api/types/response";
import { userUsecase } from "../../../../api/usecases";
import NextCors from "nextjs-cors";

const handleUserAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { success, payload, error } = AuthMiddleware(req, res);
    if (!success) {
      return;
    }
    if (req.method === "GET") {
      const user = await userUsecase.computeDataOnScope(payload.uid, payload.scope, payload.clientId);
      return res.status(200).send(createResponse(true, "", {
        user: user
      }));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleUserAPI;
