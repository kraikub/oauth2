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
