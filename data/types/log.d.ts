interface Log {
  clientId: string;
  timestamp: Date;
  ssid: string;
  uid: string;
  scope: string;
  userAgentPlatform: string;
  userAgentMobile: string;
  userAgent: string;
  ip: string;
}

interface LogDTO {
  ssid: string
  scope: string;
  timestamp: string;
  userAgentPlatform: string;
  userAgentMobile: string;
  userAgent: string;
  ip: string;
  app: {
    appName: string;
  }
}