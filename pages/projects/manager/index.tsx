import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { PageAuthMiddleware } from "../../../api/middlewares/auth.middleware";
import { userRepository } from "../../../api/repositories/user";
import { aggregations } from "../../../data/aggregations";
import { jsonSerialize } from "../../../src/utils/json";
import { getSigninUrl } from "../../../src/utils/path";

import { ProjectManagerDashboard } from "../../../src/views/projects/manager/dashboard";

export const getServerSideProps: GetServerSideProps<
  DashboardServerSideProps
> = async (context) => {
  const { uid, error } = PageAuthMiddleware(context.req.cookies.access);
  if (!uid) {
    return {
      props: {
        data: null,
      },
    };
  }
  const u = await userRepository.useAggregationPipeline([
    ...aggregations.private.user(uid),
    ...aggregations.private.apps,
    ...aggregations.private.student(),
  ]);

  return {
    props: {
      data: u.length ? (jsonSerialize(u[0]) as UserWithApplication) : null,
    },
  };
};

const Dashboard: NextPage<DashboardServerSideProps> = (props) => {
  const router = useRouter();
  if (!props.data) {
    router.push(getSigninUrl({}));
    return null;
  }
  return <ProjectManagerDashboard data={props.data} />;
};

export default Dashboard;
