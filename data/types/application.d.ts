interface Application {
  appName: string;
  appId: string;
  appDescription: string;
  appType: string;
  clientId: string;
  ownerId: string;
  creatorName: string;
  redirects: {
    url: string;
  }[];
  secret: string;
  refId: string;
  refType: string;

}

interface CreateApplicationDTO {
  appName: string;
  appDescription: string;
  appType: string;
}