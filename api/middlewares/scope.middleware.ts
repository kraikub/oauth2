import { NextApiRequest, NextApiResponse } from "next";
import { createResponse } from "../types/response";
import { Scope } from "../types/scope";
export const scopeMiddleware = (res: NextApiResponse, scope: string | undefined, allowedScopes: Scope[]): boolean => {
  if (!scope) {
    res.status(405).send(createResponse(false, "Unauthorizable scope", null))
    return false;
  }
  for (const s of allowedScopes) {
    if (s == scope) {
      return true;
    }
  }
  res.status(405).send(createResponse(false, "Unauthorizable scope", null))
  return false;
}