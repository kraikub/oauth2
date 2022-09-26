import { Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService } from "../../src/services/authService";

const Callback: NextPage = () => {
  const router = useRouter();

  const handleClaimAccessTokens = async (ctoken: string) => {
    try {
      if (router.query.scope === "0") {
        alert("Sign in scope not allowed.");
        return router.push("/projects/manager/");
      }
      await authService.claimAccessToken(ctoken);
      return router.push("/projects/manager/");
    } catch {
      return router.push("/projects/manager/");
    }
  };

  useEffect(() => {
    if (router.query.ctoken && router.query.scope) {
      handleClaimAccessTokens(router.query.ctoken as string);
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
