import { orgUsecase } from "./../../../../api/usecases/organization";
import { NextApiRequest, NextApiResponse } from "next";
import { PrivateAuthMiddleware } from "../../../../api/middlewares/private.middleware";
import { createResponse } from "../../../../api/utils/response";
import { handleApiError } from "../../../../api/error";

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success || !payload) {
      return;
    }
    if (req.method === "POST") {
      const { orgName, orgUsername, position } = req.body;
      const result = await orgUsecase.createNewOrg(
        orgName,
        orgUsername,
        payload.uid,
        position
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
