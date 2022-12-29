import { kraikubIdUsecase } from './../../../api/usecases/kraikubid';
import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../api/error";
import { PrivateAuthMiddleware } from "../../../api/middlewares/private.middleware";
import { userUsecase } from "../../../api/usecases";
import { createResponse } from "../../../api/utils/response";

const handleEmailVerificationApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success || !payload) {
      return;
    }
    if (req.method === "POST") {
      const { email } = req.body;
      const user = await userUsecase.getPrivateUserWithStudent(payload.uid);
      if (!user) {
        return
      }
      const mailRes = await kraikubIdUsecase.verifyEmail(email, user, req.cookies.LANG || "en")
      return res.status(200).send(createResponse(true, "Operation success", {
        mailServiceResponseStatus: mailRes?.status,
        mailServiceResponseBody: mailRes?.data
      }));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleEmailVerificationApi;
