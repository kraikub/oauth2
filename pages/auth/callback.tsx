import { Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Callback: NextPage = () => {
  const router = useRouter();
  const [cont, setCont] = useState(false);

  const handleStoreTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
    setCont(true);
  };

  const validateLocalStorage = () => {
    if (
      localStorage.getItem("access") &&
      localStorage.getItem("refresh") &&
      cont
    ) {
      if (router.query.ref && router.query.ref[0] as string === "/") {
        return router.push(router.query.ref as string)
      }
      return router.push("/projects/manager");
    }
  };

  useEffect(() => {
    if (cont) {
      validateLocalStorage();
    }
  }, [cont]);

  useEffect(() => {
    if (router.query.access && router.query.refresh) {
      handleStoreTokens(
        router.query.access as string,
        router.query.refresh as string
      );
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Signing in, please wait...</title>
      </Head>
      <Progress size="xs" isIndeterminate colorScheme="katrade" />
    </>
  );
};
export default Callback;
