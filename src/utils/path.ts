import { mapQueryStringToUrl } from "../../api/utils/query";

interface signinOptions {
  redirectPath?: string
}

export const getSigninUrl = (p: signinOptions) => {
  return mapQueryStringToUrl("/signin", {
    client_id:
      process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID ||
      "ENV_CLIENT_ID_NOT_CONFIGURED",
    scope: "1",
    ref: p.redirectPath ? p.redirectPath :"client-signin-kapis-auth",
    dev:
      process.env.NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV === "development"
        ? "true"
        : "false",
    secret:
      process.env.NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV === "development"
        ? process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_SECRET ||
          "ENV_CLIENT_SECRET_NOT_CONFIGURED"
        : undefined,
  });
};
