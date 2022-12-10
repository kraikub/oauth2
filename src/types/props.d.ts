type UserVariant = UserWithStudent | UserWithApplication

interface BasePageProps {
  user: UserWithStudent | null
}

interface UserWithApplication extends UserWithStudent {
  applications: Application[]
}

interface DashboardServerSideProps  {
  data: UserWithApplication | null
}

interface ClientPageServerSideProps extends BasePageProps {
  app: Application | null;
  permission?: boolean;
}