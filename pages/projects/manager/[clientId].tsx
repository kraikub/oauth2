import { GetServerSideProps, NextPage } from "next";
import { applicationRepository } from "../../../api/repositories/application";
import { Application } from "../../../db/schema/application";
import { UserProvider } from "../../../src/contexts/User";
import ClientPage from "../../../src/views/projects/manager/client";

interface ClientPageProps {
  app: Application | null;
}

const Client: NextPage<ClientPageProps> = ({ app }) => {
  return (
    <UserProvider>
      <ClientPage app={app} />
    </UserProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { clientId } = context.query;
  if (!clientId) {
    return {
      props: {
        app: null,
      },
    };
  }
  const app = await applicationRepository.findOneApp({
    clientId: clientId as string,
  });
  return {
    props: {
      app: app
        ? {
            appName: app.appName,
            appDescription: app.appDescription,
            appType: app.appType,
            clientId: app.clientId,
            ownerId: app.ownerId,
            creatorName: app.creatorName,
            callbackUrl: app.callbackUrl,
            devCallbackUrl: app.devCallbackUrl,
            secret: app.secret,
          }
        : null,
    },
  };
};

export default Client;
