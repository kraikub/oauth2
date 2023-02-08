import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { aggregations } from "../../data/aggregations";
import { userWithExtraAggr } from "../../data/aggregations/user";
import { UserModel } from "../../data/models/user";
import { mongodb } from "../../data/mongo";
import { ClientRender } from "../../src/components/ClientRender";
import { UserProvider } from "../../src/contexts/User";
import Navbar from "../../src/layouts/Navbar";
import { jsonSerialize } from "../../src/utils/json";
import { KraikubIdPageBody } from "../../src/views/kraikub-id";

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
  const u = await UserModel.aggregate(userWithExtraAggr(uid));

  const accessPipeline = [
    {
      $match: {
        uid: uid,
      },
    },
    {
      $lookup: {
        from: "logs",
        localField: "uid",
        foreignField: "uid",
        as: "logs",
      },
    },
    {
      $lookup: {
        from: "accesses",
        localField: "uid",
        foreignField: "uid",
        as: "accesses",
        pipeline: [
          {
            $lookup: {
              from: "applications",
              localField: "clientId",
              foreignField: "clientId",
              as: "app",
            },
          },
        ],
      },
    },
  ];

  let res = await UserModel.aggregate(accessPipeline);
  return {
    props: {
      user: u.length ? jsonSerialize(u[0]) : null,
      accesses: res.length ? jsonSerialize(res[0].accesses) : null,
      logs: res.length ? jsonSerialize(res[0].logs) : null,
    },
  };
};

interface KraikubIDPageProps extends OAuthActivitiesProps {
  user: UserWithExtra;
}

const KraikubIDPage: NextPage<KraikubIDPageProps> = (props) => {
  return (
    <UserProvider user={props.user}>
      <Head>
        <title>Kraikub ID</title>
      </Head>
      <Navbar />
      <ClientRender>
        <KraikubIdPageBody accesses={props.accesses} logs={props.logs} />
      </ClientRender>
    </UserProvider>
  );
};

export default KraikubIDPage;
