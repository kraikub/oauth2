import { mapQueryStringToUrl } from "../../api/utils/query";

interface signinOptions {
  redirectPath?: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
}

export const getSigninUrl = (p: signinOptions) => {
  return mapQueryStringToUrl("/signin", {
    client_id:
      process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID ||
      "ENV_CLIENT_ID_NOT_CONFIGURED",
    scope: "provider",
    state: p.redirectPath ? p.redirectPath :"client-signin-kraikub-oauth",
    dev:
      process.env.NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV === "development"
        ? "true"
        : "false",
    secret:
      process.env.NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV === "development"
        ? process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_SECRET ||
          "ENV_CLIENT_SECRET_NOT_CONFIGURED"
        : undefined,
    redirect_uri: process.env.NEXT_PUBLIC_SERVER_DOMAIN+"/auth/callback",
    response_type: "code",
  });
};


export const p = {
  projects: "/a",
  kraikubId: "/id",
  settings: "/settings",
  emailVerification: "/id/kraikubid-activation",
  signUpVerification: "/id/external/activation",
  organization: "/id/organization",
  organizationInviteLanding: "/id/external/organization/join"
}