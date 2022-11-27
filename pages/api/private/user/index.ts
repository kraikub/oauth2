import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { createResponse } from "../../../../api/utils/response";
import { userUsecase } from "../../../../api/usecases";
import { PrivateAuthMiddleware } from "../../../../api/middlewares/private.middleware";

const handleUserAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success || !payload) {
      return;
    }
    if (req.method === "GET") {
      const user = await userUsecase.getPrivateUserWithStudent(payload.uid);
      return res.status(200).send(createResponse(true, "", user));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleUserAPI;
