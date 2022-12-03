import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { handleApiError } from "../../../api/error";
import { createResponse } from "../../../api/utils/response";

const handleSignoutAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: req.headers.origin,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "GET") {
      return res
      .status(200)
      .setHeader("Set-Cookie", [
        `access=null; HttpOnly; Domain=${process.env.SHARE_ACCESS_DOMAIN || req.headers.origin}; Max-Age=1000; Path=/; Secure`,
      ]) // Expire in almost 7 days.
      .setHeader("Access-Control-Allow-Credentials", "true")
      .setHeader("Access-Control-Allow-Headers", "Set-Cookie")
      .send(createResponse(true, "Signed out", null));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};

export default handleSignoutAPI;
