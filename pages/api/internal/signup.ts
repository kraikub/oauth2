import { orgUsecase } from "./../../../api/usecases/organization";
import { makeResponse } from "./../../../api/utils/response";
import { userUsecase } from "./../../../api/usecases/user";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, accountType, username } = req.body;
  if (!firstName || !lastName || !email || !accountType) {
    return makeResponse(
      res,
      400,
      false,
      "Missing some required arguments.",
      undefined
    );
  }

  const usernameResult = await orgUsecase.isUsernameAvailable(username);
  if (!usernameResult.data?.available) {
    return makeResponse(
      res,
      usernameResult.httpStatus || 405,
      usernameResult.data?.available || false,
      usernameResult.message || "",
      { ...usernameResult.data }
    );
  }

  const result = await userUsecase.signUp(
    `${firstName} ${lastName}`,
    email,
    accountType,
    username,
    req.cookies.LANG
  );

  return makeResponse(
    res,
    result.httpStatus || 200,
    result.success,
    result.message || "",
    {
      mailServiceResponseStatus: result.data
        ? result.data.mailResponse?.status
        : undefined,
      mailServiceResponseBody: result.data
        ? result.data.mailResponse?.data
        : undefined,
    }
  );
};
export default handler;
