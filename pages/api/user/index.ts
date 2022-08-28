import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../api/error";
import { AuthMiddleware } from "../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../api/types/response";
import { userUsecase } from "../../../api/usecases";

const handleUserAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { success, payload, error } = AuthMiddleware(req, res);
    if (!success) {
      return;
    }
    if (req.method === "GET") {
      const user = await userUsecase.publicData(payload.uid);
      return res.status(200).send(createResponse(true, "", user));
    }
  } catch (error) {
    handleApiError(res, error)
  }
};

export default handleUserAPI 