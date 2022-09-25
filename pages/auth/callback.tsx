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
      const { data } = await authService.claimAccessToken(ctoken);
      console.log(data);
      router.push("/projects/manager/");
    } catch {
      router.push("/projects/manager/");
    }
  };

  useEffect(() => {
    if (router.query.ctoken) {
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
