import { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../api/utils/response";
import * as crypto from "crypto";
import { applicationUsecase } from "../../../api/usecases";
import { handleApiError } from "../../../api/error";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = AuthMiddleware(req, res);
    if (!success) {
      return;
    }

    if (req.method === "GET") {
      const apps = await applicationUsecase.findApp({
        ownerId: payload.uid,
      });
      return res.status(200).send(createResponse(true, "", apps));
    }

    if (req.method === "POST") {
      const {
        appName,
        appDescription,
        creatorName,
        callbackUrl,
        devCallbackUrl,
        appType,
      } = req.body;
      if (
        !appName ||
        !appDescription ||
        !creatorName ||
        !appType
      ) {
        return res
          .status(400)
          .send(createResponse(false, "Some field is missing.", null));
      }
      const newApp: Application = {
        appName,
        appDescription,
        creatorName,
        appType,
        redirects: [],
        clientId: crypto.randomBytes(16).toString("hex"),
        secret: crypto.randomBytes(28).toString("hex"),
        ownerId: payload.uid,
      };
      const success = await applicationUsecase.createApp(newApp);
      if (!success) {
        return res.status(403).send(createResponse(false, "Unable to create an app for this user.", newApp));
      }
      return res.status(200).send(createResponse(true, "", newApp));
    }
    return res.status(404).send(createResponse(false, "Not found.", null));
  } catch (error) {
    return handleApiError(res, error);
  }
};
export default handler;
