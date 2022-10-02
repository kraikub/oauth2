import type { GetServerSideProps, NextPage } from "next";
import { applicationRepository } from "../api/repositories/application";
import { Query } from "../src/types/query";
import SigninPage from "../src/views/signin";

interface SigninPageProps {
  query: Query;
  app: Application | null;
}

const Signin: NextPage<SigninPageProps> = ({ query, app }) => {
  return <SigninPage app={app} query={query} />;
};

const serializable = (o: any) => {
  return JSON.parse(JSON.stringify(o));
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { client_id, state, scope, dev, secret, redirect_uri } = context.query;
  let app: Application | null = null;
  if (client_id !== undefined) {
    app = await applicationRepository.findOneApp({
      clientId: client_id as string,
    });
  }
  return {
    props: {
      query: {
        client_id: client_id ? client_id : null,
        state: state ? state : null,
        scope: scope ? scope : null,
        dev: dev ? dev : null,
        secret: secret ? secret : null,
        redirect_uri: redirect_uri ? redirect_uri : null,
      },
      app: app
        ? {
            appName: app.appName,
            appDescription: app.appDescription,
            appType: app.appType,
            clientId: app.clientId,
            ownerId: app.ownerId,
            creatorName: app.creatorName,
            redirects: serializable([...app.redirects]),
            secret: app.secret,
          }
        : null,
    },
  };
};

export default Signin;
