import { PrivateAuthMiddleware } from '../../../api/middlewares/private.middleware';
import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError, handleErrResponse } from "../../../api/error";
import { createResponse } from "../../../api/utils/response";
import { applicationUsecase } from "../../../api/usecases";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success || !payload) {
      return;
    }

    const { clientId } = req.query;

    if (!clientId) {
      return res
        .status(400)
        .send(createResponse(false, "Require clientId.", null));
    }

    if (req.method === "GET") {
      const app = await applicationUsecase.findOneApp({
        clientId: clientId as string,
      });
      if (app === null) {
        return res.status(200).send(createResponse(true, "", app));
      }
      if (app.ownerId !== payload.uid) {
        return res
          .status(405)
          .send(createResponse(false, "Not the application owner.", null));
      }
      return res.status(200).send(createResponse(true, "", app));
    }

    if (req.method === "PUT") {
      const { appDescription, creatorName, redirects } =
        req.body;
      const { success, status, application } =
        await applicationUsecase.updateApp(payload.uid, clientId as string, {
          appDescription,
          creatorName,
          redirects,
        });
      if (!success) {
        return handleErrResponse(res, status, "", null);
      }
      return res
        .status(200)
        .send(createResponse(true, "Update complete", application));
    }

    if (req.method === "DELETE") {
      const { success, status } = await applicationUsecase.deleteApp(
        payload.uid,
        clientId as string
      );
      if (!success) {
        return handleErrResponse(res, status, "", null);
      }
      return res
        .status(200)
        .send(createResponse(true, "Delete complete", null));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};
export default handler;
