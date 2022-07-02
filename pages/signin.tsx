import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Application } from "../db/schema/application";
import { clientService } from "../src/services/clientService";
import SigninPage from "../src/views/signin";

interface SigninPageProps {
  query: {
    client_id?: string | string[] | null;
    ref?: string | string[] | null;
    scope?: string | string[] | null;
  };
  app: Application | null;
}

const Signin: NextPage<SigninPageProps> = ({ query, app }) => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <SigninPage app={app} />
    </>
  );
};

export default Signin;

interface SigninServerSideProps {
  props: SigninPageProps;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { client_id, ref, scope } = context.query;
  let app: Application | undefined;
  if (client_id !== undefined) {
    app = await clientService.getApplication(client_id?.toString());
  }

  return {
    props: {
      query: {
        client_id: client_id ? client_id : null,
        ref: ref ? ref : null,
        scope: scope ? scope : null,
      },
      app: app ? app : null,
    },
  };
};
