import { Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService } from "../../src/services/authService";
import { userService } from "../../src/services/userService";

const Callback: NextPage = () => {
  const router = useRouter();

  const handleClaimAccessTokens = async (code: string) => {
    try {
      const { status, data } = await userService.get();
      if (!data.payload || status >= 400) {
        return router.push("/auth");
      }
      else {
        return router.push("/projects/manager");
      }
    } catch {
      return router.push("/auth");
    }
  };

  useEffect(() => {
    if (router.query.code && router.query.scope) {
      handleClaimAccessTokens(router.query.code as string);
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
