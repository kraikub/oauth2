import { orgUsecase } from "./../../../../api/usecases/organization";
import { NextApiRequest, NextApiResponse } from "next";
import { PrivateAuthMiddleware } from "../../../../api/middlewares/private.middleware";
import { createResponse } from "../../../../api/utils/response";
import { handleApiError } from "../../../../api/error";

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { orgName } = req.body;
      const result = await orgUsecase.isNameAvailable(orgName);
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
