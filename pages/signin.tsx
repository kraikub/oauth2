import { mongo } from "mongoose";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { applicationRepository } from "../api/repositories/application.repo";
import { mongodb } from "../db/mongodb";
import { Application } from "../db/schema/application";
import { clientService } from "../src/services/clientService";
import { Query } from "../src/types/query";
import SigninPage from "../src/views/signin";

interface SigninPageProps {
  query: Query;
  app: Application | null;
}

const Signin: NextPage<SigninPageProps> = ({ query, app }) => {
  return <SigninPage app={app} query={query} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { client_id, ref, scope, dev, secret } = context.query;
  let app: Application | null = null;
  if (client_id !== undefined) {
    await mongodb.connect();
    app = await applicationRepository.findOneApp({
      clientId: client_id as string,
    });
  }
  return {
    props: {
      query: {
        client_id: client_id ? client_id : null,
        ref: ref ? ref : null,
        scope: scope ? scope : null,
        dev: dev ? dev : null,
        secret: secret ? secret : null,
      },
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

export default Signin;
