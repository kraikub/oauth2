import { userUsecase } from "./../../../../api/usecases/user";
import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { createResponse } from "../../../../api/utils/response";
import { PrivateAuthMiddleware } from "../../../../api/middlewares/private.middleware";

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success || !payload) {
      return;
    }
    if (req.method === "POST") {
      const { key, index } = req.body;
      const result = await userUsecase.updateProfilePic(
        payload.uid,
        key,
        index
      );
      return res.status(result.httpStatus || 200).send(
        createResponse(result.success, result.message || "", {
          ...result.data,
        })
      );
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default controller;
