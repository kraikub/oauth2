import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { orgUsecase } from "../../api/usecases/organization";
import { aggregations } from "../../data/aggregations";
import { UserModel } from "../../data/models/user";
import { mongodb } from "../../data/mongo";
import { ClientRender } from "../../src/components/ClientRender";
import { UserProvider } from "../../src/contexts/User";
import Navbar from "../../src/layouts/Navbar";
import { jsonSerialize } from "../../src/utils/json";
import { KraikubIdPageBody } from "../../src/views/kraikub-id";
import { OrgDashboardPage } from "../../src/views/organization";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = PageAuthMiddleware(context.req.cookies.access);
  await mongodb.connect();
  if (!uid) {
    return {
      props: {
        user: null,
      },
    };
  }
  const u = await UserModel.aggregate([
    ...aggregations.private.user(uid),
    ...aggregations.private.student(),
  ]);

  const orgData = await orgUsecase.getOrgForDisplay(u[0].orgId)

  return {
    props: {
      user: u.length ? jsonSerialize(u[0]) : null,
      organization: jsonSerialize(orgData),
    }
  };
};

interface OrganizationPageProps {
  user: UserWithStudent;
  organization: FullOrganizationDisplayData; 
}

const OragnizationPage: NextPage<OrganizationPageProps> = (props) => {
  return (
    <UserProvider user={props.user}>
      <Head>
        <title>Kraikub ID</title>
      </Head>
      <Navbar />
      <ClientRender>
        <OrgDashboardPage org={props.organization}/>
      </ClientRender>
    </UserProvider>
  );
};

export default OragnizationPage;
