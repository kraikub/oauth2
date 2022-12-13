import { Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService } from "../../src/services/authService";
import { userService } from "../../src/services/userService";

const Callback: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/projects/manager")
  }, []);

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
