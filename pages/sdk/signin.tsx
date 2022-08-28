import { Query } from "../../src/types/query";
import type { GetServerSideProps, NextPage } from "next";
import { applicationRepository } from "../../api/repositories/application";
import { Application } from "../../db/schema/application";
import SigninPage from "../../src/views/signin";
import { useEffect, useRef } from "react";

interface SigninPageProps {
  query: Query;
  app: Application | null;
}

const Signin: NextPage<SigninPageProps> = ({ query, app }) => {
  const origin = useRef<string>("");
  const child = useRef<Window | null>(null);

  function msg(access: string, refresh: string) {
    if (typeof window !== "undefined") {
      // Client-side-only code
      window.opener.postMessage({ access, refresh }, origin.current);
      setTimeout(() => window.close(), 1000);
    }
  }
  useEffect(() => {
    console.log("top", window.top?.name);
    console.log("parent", window.parent?.name);
    window.addEventListener(
      "message",
      (event) => {
        // Do we trust the sender of this message?  (might be
        // different from what we originally opened, for example).
        const data = `${event.data}`;
        if (data.includes("reply;")) {
          const lc = (event.data as string).split(";")[1];
          console.log(lc);
          origin.current = lc;
        }
        console.log(event.data);
        // event.source is popup
        // event.data is "hi there yourself! the secret response is: rheeeeet!"
      },
      false
    );
  }, []);
  return (
    <>
      <SigninPage app={app} query={query} onSigninComplete={msg} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { client_id, ref, scope, dev, secret } = context.query;
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
