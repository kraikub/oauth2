import { orgUsecase } from "./../../../../api/usecases/organization";
import { NextApiRequest, NextApiResponse } from "next";
import { createResponse } from "../../../../api/utils/response";
import { handleApiError } from "../../../../api/error";

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { orgUsername } = req.body;
      const result = await orgUsecase.isUsernameAvailable(orgUsername);
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
