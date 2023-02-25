import type { GetServerSideProps, NextPage } from "next";
import { applicationRepository } from "../api/repositories/application";
import SigninPage from "../src/views/signin";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "react-i18next";

interface SigninPageProps {
  query: Query;
  app: Application | null;
}

const Signin: NextPage<SigninPageProps> = ({ query, app }) => {
  const { ready } = useTranslation()
  return <SigninPage app={app} query={query} />;
};

const serializable = (o: any) => {
  return JSON.parse(JSON.stringify(o));
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    client_id,
    state,
    scope,
    dev,
    secret,
    redirect_uri,
    response_type,
    code_challenge,
    code_challenge_method,
  } = context.query;
  let app: Application | null = null;
  if (client_id !== undefined) {
    app = await applicationRepository.findOneApp({
      clientId: client_id as string,
    });
  }
  return {
    props: {
      ...(await serverSideTranslations(context.req.cookies.LANG || "th", [
        'signin',
      ])),
      query: {
        client_id: client_id ? client_id : null,
        state: state ? state : null,
        scope: scope ? scope : null,
        dev: dev ? dev : null,
        secret: secret ? secret : null,
        redirect_uri: redirect_uri ? redirect_uri : null,
        response_type: response_type ? response_type : null,
        code_challenge: code_challenge ? code_challenge : null,
        code_challenge_method: code_challenge_method ? code_challenge_method : null,
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
