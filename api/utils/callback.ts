import { AuthenticationObject } from "../types/auth.response";
import { mapQueryStringToUrl } from "./query";

export const redirectToAuthenticateCallback = (
  url: string,
  queryString: { [key: string]: string }
) => {
  return mapQueryStringToUrl(url, queryString);
};
