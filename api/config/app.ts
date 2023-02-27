export const appConfig = {
  INIT_MAX_APP_QUOTA: 10,
  grantTypes: ["code"],
  codeChallengeMethod: ["SHA256"],
  tokenPayloadTypes: ["json", "http_cookie"],
  cookieMaxAge: 1707109200,
  defaultProfileImageUrl:
    "https://kraikub.com/static/avatar/default/profile.png",
  openid: {
    iss: "https://app.kraikub.com",
  },
  expirations: {
    accessToken: {
      str: "60m",
      ms: 60 * 60 * 1000,
      s: 60 * 60,
    },
    refreshToken: {
      str: "14d",
      ms: 60 * 60 * 24 * 14 * 1000,
      s: 60 * 60 * 24 * 14,
    },
    authorizationCode: {
      str: "1m",
      ms: 60 * 1000,
      s: 60,
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
    },
    invites: {
      str: "14d",
      ms: 60 * 60 * 24 * 14 * 1000,
      s: 60 * 60 * 24 * 14,
    },
  },
};

export const profileCollections: {
  [key: string]: { name: string; baseUrl: string; urls: string[] };
} = {
  bricks: {
    name: "Bricks Edition",
    baseUrl: "https://kraikub.com",
    urls: [
      "/static/avatar/bricks/wm1.jpg",
      "/static/avatar/bricks/wm2.jpg",
      "/static/avatar/bricks/wm3.jpg",
      "/static/avatar/bricks/wm4.jpg",
      "/static/avatar/bricks/m1.jpg",
      "/static/avatar/bricks/m2.jpg",
      "/static/avatar/bricks/m3.jpg",
      "/static/avatar/bricks/m4.jpg",
    ],
  },
  cat: {
    name: "Cat Mastery",
    baseUrl: "",
    urls: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    ],
  },
  dog: {
    name: "Dog Lovers",
    baseUrl: "",
    urls: [
      "https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=994&q=80",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    ],
  },
};
