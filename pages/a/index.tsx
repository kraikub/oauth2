import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { applicationRepository } from "../../api/repositories/application";
import { orgRepo } from "../../api/repositories/organization";
import { roleRepo } from "../../api/repositories/role";
import { userRepository } from "../../api/repositories/user";
import { userUsecase } from "../../api/usecases";
import { aggregations } from "../../data/aggregations";
import { userWithExtraAggr } from "../../data/aggregations/user";
import { LanguageProvider } from "../../src/contexts/Language";
import { jsonSerialize } from "../../src/utils/json";
import { getSigninUrl } from "../../src/utils/path";

import { ProjectManagerDashboard } from "../../src/views/projects/manager/dashboard";

const Dashboard: NextPage<DashboardServerSideProps> = (props) => {
  return (
    <LanguageProvider lang={props.lang}>
      <ProjectManagerDashboard {...props} />
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
  const user = await userRepository.findOne({ uid });
  if (!user) {
    return {
      props: {
        data: null,
      },
      redirect: {
        destination: getSigninUrl({}),
      },
    };
  }
  const userApps = await applicationRepository.findApp({ refId: uid });
  const org = await orgRepo.get(user.orgId || "<empty-id>");
  const orgApps = await applicationRepository.findApp({
    refId: user?.orgId || "<empty-id>",
  });
  const role = await roleRepo.getOrgRole(org?.orgId || "<empty-id>", user.uid);

  return {
    props: {
      ...(await serverSideTranslations(context.req.cookies.LANG || "th", [
        "dashboard",
      ])),
      user: jsonSerialize(user),
      userApps: jsonSerialize(userApps),
      org: jsonSerialize(org),
      orgApps: jsonSerialize(orgApps),
      role: jsonSerialize(role),
    },
  };
};

export default Dashboard;
