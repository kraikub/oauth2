import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "../../libs/jwt";
import { createResponse } from "../types/response";

export async function handleValidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { token } = req.query;
    if (token === undefined) {
      res.status(400).send({});
      return;
    }
    const [success, payload, err] = verify(token as string);
    if (!success) {
      return res
        .status(401)
        .send(createResponse(false, `Unauthorized: ${err}`, {}));
    }
    const response = createResponse(true, "", payload);
    res.send(response);
    return;
  }
  res.status(404).send({});
  return;
}
