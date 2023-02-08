import { userUsecase } from "./../../../../api/usecases/user";
import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { createResponse } from "../../../../api/utils/response";

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { username } = req.query;
      const result = await userUsecase.getSafeUserContentFromUsername(
        username as string
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
