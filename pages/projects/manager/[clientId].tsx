import { GetServerSideProps, NextPage } from "next";
import { applicationRepository } from "../../../api/repositories/application.repo";
import { Application } from "../../../db/schema/application";
import ClientPage from "../../../src/views/projects/manager/client";

interface ClientPageProps {
  app: Application | null;
}

const Client: NextPage<ClientPageProps> = ({ app }) => {
  return <ClientPage app={app} />;
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
