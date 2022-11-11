import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../../api/error";
import { AuthMiddleware } from "../../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../../api/utils/response";
import { userUsecase } from "../../../../api/usecases";

const handleValidateSigninSignatureAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { sig } = req.body
      const valid = await userUsecase.validateWithSigninSignature(sig);
      return res.status(200).send(createResponse(true, "Validate with sign in signature", {
        validateResult: valid
      }));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleValidateSigninSignatureAPI;
