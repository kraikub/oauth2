interface PageWithTranslation {
  lang: string;
}

type UserVariant = UserWithStudent | UserWithApplication;

interface BasePageProps {
  user: UserWithStudent | null;
}

interface UserWithApplication extends UserWithStudent {
  applications: Application[];
}

interface DashboardServerSideProps extends PageWithTranslation {
  data: UserWithApplication;
  lang: string;
}

interface ClientPageServerSideProps extends BasePageProps {
  app: Application | null;
  permission?: boolean;
}

interface ReducedLog {
  clientId: string;
  scope: string;
  timestamp: string;
  userAgentPlatform: string;
  userAgentMobile: string;
  userAgent: string;
  ip: string;
  ssid: string;
  createdAt: string;
  updatedAt: string;
}

interface ReducedAccess {
  accessId: string;
  clientId: string;
  createdAt: string;
  uid: string;
  updatedAt: string;
  app: {
    appName: string;
    appDescription: string;
    appType: string;
    creatorName: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface OAuthActivitiesProps {
  accesses: ReducedAccess[]
  logs: ReducedLog[]
}
