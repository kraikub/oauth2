import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { aggregations } from "../../data/aggregations";
import { UserModel } from "../../data/models/user";
import { mongodb } from "../../data/mongo";
import { UserProvider } from "../../src/contexts/User";
import Navbar from "../../src/layouts/Navbar";
import { jsonSerialize } from "../../src/utils/json";
import { KraikubIdPageBody } from "../../src/views/kraikub-id";
import { ActivatePage } from "../../src/views/kraikub-id/components/ActivatePage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = PageAuthMiddleware(context.req.cookies.access);
  await mongodb.connect();
  if (!uid) {
    return {
      props: {
        u: null,
      },
    };
  }
  const u = await UserModel.aggregate([
    ...aggregations.private.user(uid),
    ...aggregations.private.student(),
  ]);
  return {
    props: {
      u: u.length ? jsonSerialize(u[0]) : null,
    },
  };
};


interface KraikubIDPageProps {
  u: UserWithStudent;
}

const KraikubIDActivate: NextPage<KraikubIDPageProps> = (props) => {
  return (
    <UserProvider user={props.u}>
      <Head>
        <title>Activate Kraikub ID</title>
      </Head>
      <ActivatePage />
    </UserProvider>
  );
};

export default KraikubIDActivate