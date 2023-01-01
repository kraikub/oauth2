import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { userRepository } from "../../api/repositories/user";
import { aggregations } from "../../data/aggregations";
import { LanguageProvider } from "../../src/contexts/Language";
import { jsonSerialize } from "../../src/utils/json";
import { getSigninUrl } from "../../src/utils/path";

import { ProjectManagerDashboard } from "../../src/views/projects/manager/dashboard";

const Dashboard: NextPage<DashboardServerSideProps> = (props) => {
  return (
    <LanguageProvider lang={props.lang}>
      <ProjectManagerDashboard data={props.data} />
    </LanguageProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid, error } = PageAuthMiddleware(context.req.cookies.access);

  if (!uid) {
    return {
      props: {
        data: null,
      },
      redirect: {
        destination: getSigninUrl({}),
      },
    };
  }
  const u = await userRepository.useAggregationPipeline([
    ...aggregations.private.user(uid),
    ...aggregations.private.apps,
    ...aggregations.private.student(),
  ]);

  if (!u.length) {
    return {
      props: {
        data: null,
      },
      redirect: {
        destination: getSigninUrl({}),
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.req.cookies.LANG || "th", [
        "dashboard",
      ])),
      data: u.length ? (jsonSerialize(u[0]) as UserWithApplication) : null,
    },
  };
};

export default Dashboard;
