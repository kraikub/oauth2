import { Query } from "../../src/types/query";
import type { GetServerSideProps, NextPage } from "next";
import { applicationRepository } from "../../api/repositories/application";
import { Application } from "../../db/schema/application";
import SigninPage from "../../src/views/signin";
import { useEffect, useRef, useState } from "react";
import OnDeviceSigninPage from "../../src/views/signin/ondevice-signin";

interface SigninPageProps {
  query: Query;
  app: Application | null;
}

interface SigninRequestSignal {
  ref: string;
  origin: string;
  secret: string;
  type: string;
}

const Signin: NextPage<SigninPageProps> = ({ query, app }) => {
  const origin = useRef<string>("");
  const [secret, setSecret] = useState("");
  const [isRecieveRequest, setIsRecieveRequest] = useState<boolean>(false);
  const pass = useRef<boolean>(false);
  function msg(access: string, refresh: string, u: PublicUserData) {
    if (typeof window !== "undefined") {
      // Client-side-only code
      const msgBody = {
        ref: "kraikub-signin",
        type: "report",
        success: true,
        access: access,
        refresh: refresh,
        user: u,
      };
      window.opener.postMessage(msgBody, origin.current);
      setTimeout(() => window.close(), 1000);
    }
  }

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        // Do we trust the sender of this message?  (might be
        // different from what we originally opened, for example).
        const data = event.data;
        if (event.data.ref === "kraikub-signin") {
          const req = event.data as SigninRequestSignal;
          if (req.type === "init") {
            origin.current = req.origin;
            if (origin.current) {
              const initReport = {
                ref: "kraikub-signin",
                type: "init",
              };
              window.opener.postMessage(initReport, origin.current);
            }
          }
          if (req.type === "request") {
            if (req.secret && req.origin) {
              origin.current = req.origin;
              setSecret(req.secret);
              setIsRecieveRequest(true);
              pass.current = true;
            }
          }
        }
      },
      false
    );
    setTimeout(() => {
      if (!pass.current) {
        alert("Operation timeout, please try again.");
      }
    }, 20000);
  }, []);
  return (
    <>
      <OnDeviceSigninPage
        app={app}
        query={query}
        onSigninComplete={msg}
        secret={secret}
        isRecieveRequest={isRecieveRequest}
      />
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
