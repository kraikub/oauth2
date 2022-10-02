import { Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService } from "../../src/services/authService";

const Callback: NextPage = () => {
  const router = useRouter();

  const handleClaimAccessTokens = async (code: string) => {
    try {
      if (router.query.scope === "0") {
        alert("Sign in scope not allowed.");
        return router.push("/projects/manager/");
      }
      await authService.claimAccessToken(code);
      if (!router.query.state) {
        return router.push("/projects/manager/");
      }
      else {
        const httpRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        if (httpRegex.test(router.query.state as string)) {
          return router.push(router.query.state as string)
        }
        else {
          return router.push("/projects/manager/");
        }
      }
    } catch {
      return router.push("/projects/manager/");
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
