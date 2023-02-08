import { NextApiResponse } from "next";
export const createResponse = (
  status: boolean,
  message: string,
  payload: any
): GlobalResponse => {
  return {
    status,
    message,
    payload,
    timestamp: new Date(Date.now()),
  };
};

export const makeResponse = (
  res: NextApiResponse,
  status: number,
  success: boolean,
  message: string,
  payload: any
) => {
  res.status(status).send(createResponse(success, message, payload));
};
