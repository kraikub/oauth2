import { gradeFromResponse } from './../../scopes/grade';
import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../error";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { myKUService } from "../services/mykuService";
import { createResponse } from "../types/response";

export async function studentGradesApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { success, payload } = AuthMiddleware(req, res);
      if (!success) return;
      const { status, data } = await myKUService.getGrades(
        payload.stdCode,
        payload.accessToken
      );
      if (status !== 200) {
        return res
          .status(status)
          .send(createResponse(false, "Failed from myapi.ku.th", {}));
      }
      const converted = gradeFromResponse(data);
      return res.send(createResponse(true, "", converted));
    }
    res.status(404).send({});
  } catch (error) {
    handleApiError(res, error);
  }
}