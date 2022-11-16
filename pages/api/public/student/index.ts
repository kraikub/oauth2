import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { AuthMiddleware } from "../../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../../api/utils/response";
import { userUsecase } from "../../../../api/usecases";
import NextCors from "nextjs-cors";
import { scopeMiddleware } from "../../../../api/middlewares/scope.middleware";
import { AccessControlMiddleware } from "../../../../api/middlewares/access-control";

const handleStudentAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const allowedScope = scopeMiddleware(res, session.scope, ["1", "2"]);
    if (!allowedScope) {
      return;
    }

    if (req.method === "GET") {
      const out = await userUsecase.getUserWithStudent(session.uid);
      return res.status(200).send(createResponse(true, "", out));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleStudentAPI;
