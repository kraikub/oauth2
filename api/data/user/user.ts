import { NextApiResponse, NextApiRequest } from "next";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { userRepository } from "../../repositories/user";
import { createResponse } from "../../types/response";
export const handleUserAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { success, payload, error } = AuthMiddleware(req, res);
    if (!success) {
      return res
        .status(401)
        .send(createResponse(false, `Unauthorized: ${error}`, null));
    }
    if (req.method === "GET") {
      const user = await userRepository.findOne({ uid: payload.uid });
      return res.status(200).send(createResponse(true, "", user));
    }
  } catch (error) {
    res.status(500).send(createResponse(false, "Internal Server Error", null));
  }
};
