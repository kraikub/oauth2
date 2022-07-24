import { NextApiRequest, NextApiResponse } from "next";
import { educationFromResponse } from "../../../scopes/education";
import { handleApiError } from "../../error";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { myKUService } from "../../bridge/mykuService";
import { createResponse } from "../../types/response";

export async function studentEducationApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { success, payload } = AuthMiddleware(req, res);
      if (!success) return;
      const { status, data } = await myKUService.getEducation(
        payload.stdId,
        payload.accessToken
      );
      if (status !== 200) {
        return res
          .status(status)
          .send(createResponse(false, "Failed from myapi.ku.th", {}));
      }
      const converted = educationFromResponse(data);
      return res.send(createResponse(true, "", converted));
    }
    res.status(404).send({});
  } catch (error) {
    handleApiError(res, error);
  }
}
