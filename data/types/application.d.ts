interface Application {
  appName: string;
  appDescription: string;
  appType: string;
  clientId: string;
  ownerId: string;
  creatorName: string;
  redirects: {
    url: string;
  }[];
  secret: string;
}