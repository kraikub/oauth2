import { NextApiRequest, NextApiResponse } from "next";
import { createResponse } from "../../../api/utils/response";
import { applicationUsecase } from "../../../api/usecases";
import { handleApiError } from "../../../api/error";
import { PrivateAuthMiddleware } from "../../../api/middlewares/private.middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = PrivateAuthMiddleware(req, res);
    if (!success || !payload) {
      return;
    }

    if (req.method === "GET") {
      const apps = await applicationUsecase.findApp({
        ownerId: payload.uid,
      });
      return res.status(200).send(createResponse(true, "", apps));
    }

    if (req.method === "POST") {
      const { appName, appDescription, appType, refType, refId } =
        req.body;
      if (!appName || !appDescription || !appType) {
        return res
          .status(400)
          .send(createResponse(false, "Some field is missing.", null));
      }
      const result = await applicationUsecase.createApp(
        payload.uid,
        {
          appName,
          appDescription,
          appType
        },
        refId,
        refType
      );
      return res
        .status(result.httpStatus || 200)
        .send(
          createResponse(result.success, result.message || "", result.data)
        );
    }
  } catch (error) {
    return handleApiError(res, error);
  }
};
export default handler;
