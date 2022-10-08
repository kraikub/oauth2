import { NextApiRequest, NextApiResponse } from "next";

export const AccessControlMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  res
    .setHeader("Access-Control-Allow-Credentials", "true")
    .setHeader("Access-Control-Allow-Headers", "cookie");
};
