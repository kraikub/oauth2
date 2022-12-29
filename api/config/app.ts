export const appConfig = {
  INIT_MAX_APP_QUOTA: 3,
  grantTypes: ["code"],
  codeChallengeMethod: ["SHA256"],
  tokenPayloadTypes: ["json", "http_cookie"],
  defaultProfileImageUrl: "https://id.kraikub.com/resources/default-profile.png",
  openid: {
    iss: "https://app.kraikub.com",
  },
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
    },
    idtoken: {
      str: "90d",
      ms: 60 * 60 * 24 * 90,
      s: 60 * 24 * 90,
    },
    verificationEmail: {
      str: "5m",
      ms: 1000 * 60 * 5,
      s: 60 * 5,
    }
  }

};
