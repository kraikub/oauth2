import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../api/error";
import { AuthMiddleware } from "../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../api/types/response";
import { applicationUsecase } from "../../../api/usecases";

const getApplicationFromClientIdHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {

    const { success, payload, error } = AuthMiddleware(req,res)
    if (!success) {
      return
    }

    const { clientId } = req.query;
    if (!clientId) {
      return res.status(400).send(createResponse(false, "Require clientId.", null))
    }
    const app = await applicationUsecase.findOneApp({
      clientId: clientId as string
    });
    if (app === null) {
      return res.status(200).send(createResponse(true, "", app))
    }
    if (app.ownerId !== payload.uid) {
      return res.status(405).send(createResponse(false, "Not the application owner.", null))
    }
    return res.status(200).send(createResponse(true, "", app))
    
  } catch(error) {
    handleApiError(res, error)
  }
};
export default getApplicationFromClientIdHandler;
