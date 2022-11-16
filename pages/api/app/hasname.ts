import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../api/error";
import { createResponse } from "../../../api/utils/response";
import { applicationUsecase } from "../../../api/usecases";
import { PrivateAuthMiddleware } from "../../../api/middlewares/private.middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success) {
      return;
    }
    if (req.method === "GET") {
      const { name } = req.query;
      if (!name) {
        return res.status(400).send(createResponse(false, "Bad request", null));
      }
      const detected = await applicationUsecase.hasAppName(name as string);
      return res.status(200).send(createResponse(true, "", detected));
    }
  } catch (error: unknown) {
    return handleApiError(res, error);
  }
};
export default handler;
