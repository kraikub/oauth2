import { createResponse } from "../types/response";
import { ApplicationModel } from "../../db/models/application";
import { applicationRepository } from "../repositories/application.repo";
import { mongodb } from "../../db/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Application } from "../../db/schema/application";
import * as crypto from "crypto";
import { AuthMiddleware } from "../middlewares/auth.middleware";
export async function handleApplicationUsecase(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { success, payload, error } = AuthMiddleware(req, res);
      if (!success) {
        return res
          .status(401)
          .send(createResponse(false, error as string, null));
      }
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
        !callbackUrl ||
        !devCallbackUrl ||
        !appType
      ) {
        return res
          .status(400)
          .send(createResponse(false, "some field is missing", null));
      }
      const newApp: Application = {
        appName,
        appDescription,
        creatorName,
        callbackUrl,
        devCallbackUrl,
        appType,
        clientId: crypto.randomBytes(16).toString('hex'),
        secret: crypto.randomBytes(28).toString('hex'),
        ownerId: payload.uid,
      };

      await mongodb.connect();
      await applicationRepository.createApp(newApp);
      return res.status(200).send(createResponse(true, "", null));
    } else if (req.method === "GET") {
    }
  } catch (error) {
    return res.status(500).send(createResponse(false, error as string, null));
  }
}
