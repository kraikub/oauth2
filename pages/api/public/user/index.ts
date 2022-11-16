import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { AuthMiddleware } from "../../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../../api/utils/response";
import { userUsecase } from "../../../../api/usecases";
import NextCors from "nextjs-cors";
import { AccessControlMiddleware } from "../../../../api/middlewares/access-control";

const handleUserAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: req.headers.origin,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    AccessControlMiddleware(req, res);
    const { success, session, error } = await AuthMiddleware(req, res);
    if (!success || !session) {
      return;
    }
    if (req.method === "GET") {
      const user = await userUsecase.computeDataOnScope(session.uid, session.scope, session.clientId);
      return res.status(200).send(createResponse(true, "", user));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleUserAPI;
