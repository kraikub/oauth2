import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { aggregations } from "../../data/aggregations";
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
  const u = await UserModel.aggregate([
    ...aggregations.private.user(uid),
    ...aggregations.private.student(),
  ]);

  const pipeline = [
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
      },
    },
    {
      $unwind: {
        path: "$accesses",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "applications",
        localField: "accesses.clientId",
        foreignField: "clientId",
        as: "accesses.application",
      },
    },
    {
      $group: {
        _id: "$_id",
        logs: {
          $push: "$logs",
        },
        accesses: {
          $push: "$accesses",
        },
      },
    },
    {
      $set: {
        logs: {
          $first: "$logs",
        },
      },
    },
    {
      $project: {
        accesses: {
          _id: 0,
          __v: 0,
          application: {
            clientId: 0,
            secret: 0,
            redirect: 0,
            ownerId: 0,
          },
        },
        logs: {
          uid: 0,
        },
      },
    },
  ];

  let res = await UserModel.aggregate(pipeline);

  return {
    props: {
      user: u.length ? jsonSerialize(u[0]) : null,
      accesses: res.length ? jsonSerialize(res[0].accesses) : null,
      logs: res.length ? jsonSerialize(res[0].logs) : null,
    },
  };
};

interface KraikubIDPageProps extends OAuthActivitiesProps {
  user: UserWithStudent;
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
