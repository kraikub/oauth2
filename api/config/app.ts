export const appConfig = {
  INIT_MAX_APP_QUOTA: 3,
  grantTypes: ["code"],
  codeChallengeMethod: ["SHA256"],
  tokenPayloadTypes: ["json", "http_cookie"],
  defaultProfileImageUrl: "https://id.kraikub.com/resources/default-profile.png",
  expirations: {
    accessToken: {
      str: "60m",
      ms: 60 * 60 * 1000,
      s: 60 * 60
    },
    refreshToken: {
      str: "14d",
      ms: 60 * 60 * 24 * 14 * 1000,
      s: 60 * 60 * 24 * 14
    },
    authorizationCode: {
      str: "1m",
      ms: 60 * 1000,
      s: 60
    }
  }

};
