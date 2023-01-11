import { makeResponse } from "./../../../api/utils/response";
import { userUsecase } from "./../../../api/usecases/user";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, accountType } = req.body;
  if (!firstName || !lastName || !email || !accountType) {
    return makeResponse(
      res,
      400,
      false,
      "Missing some required arguments.",
      undefined
    );
  }
  const { redisKey, mailResponse } = await userUsecase.signUp(
    `${firstName} ${lastName}`,
    email,
    accountType,
    req.cookies.LANG
  );
  if (!redisKey) {
    return makeResponse(
      res,
      406,
      false,
      "Email may be used bu another user.",
      undefined
    );
  }
  return makeResponse(res, 200, true, "Email sent", {
    mailServiceResponseStatus: mailResponse?.status,
    mailServiceResponseBody: mailResponse?.data,
  });
};
export default handler;
