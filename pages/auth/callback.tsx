import { Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService } from "../../src/services/authService";
import { userService } from "../../src/services/userService";
import { p } from "../../src/utils/path";

const Callback: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(p.projects)
  }, []);

  return (
    <>
      <Head>
        <title>Signing in, please wait...</title>
      </Head>
      <Progress size="xs" isIndeterminate colorScheme="teal" />
    </>
  );
};
export default Callback;
