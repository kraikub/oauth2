import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { PrivateAuthMiddleware } from "../../../../api/middlewares/private.middleware";
import { orgUsecase } from "../../../../api/usecases/organization";
import { createResponse } from "../../../../api/utils/response";

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success || !payload) {
      return;
    }
    if (req.method === "GET") {
      const result = await orgUsecase.leave(payload.uid);
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
