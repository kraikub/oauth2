import { AuthenticationObject } from "../types/auth.response";
import { mapQueryStringToUrl } from "./query";

export const redirectToAuthenticateCallback = (
  url: string,
  signedAuthObject: string,
  ref?: string
) => {
  return mapQueryStringToUrl(url, { token: signedAuthObject, ref: ref as string});
};
