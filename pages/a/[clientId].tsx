import { GetServerSideProps, NextPage } from "next";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { applicationUsecase, userUsecase } from "../../api/usecases";

import { UserProvider } from "../../src/contexts/User";
import { jsonSerialize } from "../../src/utils/json";
import ClientPage from "../../src/views/projects/manager/client";

export const getServerSideProps: GetServerSideProps<ClientPageServerSideProps> = async (context) => {
  const { uid } = PageAuthMiddleware(context.req.cookies.access);
  const clientId = context.params?.clientId
  if (!uid) {
    return {
      props: {
        user: null,
        app: null
      }
    }
  }
  const u = await userUsecase.getUserWithStudent(uid)
  const a = await applicationUsecase.findOneApp({
    clientId: clientId as string,
  })
  if (!u || !a) {
    return {
      props: {
        user: null,
        app: null,
      }
    }
  }

  if (u.uid !== a.ownerId) {
    return {
      props: {
        user: null,
        app: null,
        permission: false,
      }
    }
  }

  return {
    props: {
      user: jsonSerialize(u),
      app: jsonSerialize(a),
      permission: true,
    }
  }
}

const Client: NextPage<ClientPageServerSideProps> = (props) => {
  return (
    <UserProvider user={props.user}>
      <ClientPage {...props} />
    </UserProvider>
  );
};


export default Client;