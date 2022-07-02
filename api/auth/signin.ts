import type { NextApiRequest, NextApiResponse } from "next";
import { ApplicationModel } from "../../db/models/application";
import { mongodb } from "../../db/mongodb";
import { Application } from "../../db/schema/application";
import { generateAccessToken } from "../../libs/jwt";
import { handleApiError } from "../error";
import { myKUService } from "../services/mykuService";
import { createResponse } from "../types/response";

export async function handleSignin(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(400).send({});
      return;
    }
    await mongodb.connect();
    const { username, password, clientId, scope, ref } = req.body;

    const app = await ApplicationModel.findOne<Application>({
      clientId: clientId,
    });

    if (app === null || !app?.clientId) {
      res.status(400).send({});
      return;
    }

    const externalLoginResult = await myKUService.externalLogin(
      username,
      password,
      scope
    );

    if (externalLoginResult === false) {
      const response = createResponse(
        false,
        "Failed connected with apimy.ku.th",
        null
      );
      res.status(400).send(response);
    } else {
      const response = createResponse(
        true,
        "",
        externalLoginResult === null || externalLoginResult == true
          ? null
          : {
              accessToken: generateAccessToken(externalLoginResult),
            }
      );
      res.status(200).json(response);
    }
  } catch (error) {
    handleApiError(res, error);
  }
}
