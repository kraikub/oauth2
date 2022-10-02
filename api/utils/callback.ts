import { mapQueryStringToUrl } from "./query";

export const redirectToAuthenticateCallback = (
  url: string,
  queryString: { [key: string]: string }
) => {
  return mapQueryStringToUrl(url, queryString);
};

export const hasRedirect = (target: string, redirects: { url: string }[]) => {
  for (const each of redirects) {
    if (target === each.url) {
      return true;
    }
  }
  return false;
};
