import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { handleApiError } from "../../../api/error";
import { createResponse } from "../../../api/types/response";

const handleSignoutAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "GET") {
      return res
      .status(200)
      .setHeader("Set-Cookie", [
        `access=deleted; HttpOnly; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ]) // Expire in almost 24 hr.
      .setHeader("Access-Control-Allow-Credentials", "true")
      .setHeader("Access-Control-Allow-Headers", "Set-Cookie")
      .send(createResponse(true, "Signed out", null));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleSignoutAPI;
