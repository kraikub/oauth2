import { Progress } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { p } from "../../src/utils/path";

const Callback: NextPage = () => {
  const router = useRouter();

  const where = (path: string) => {
    switch (path) {
      case "view-app": {
        return p.projects;
      }
      case "view-id": {
        return p.kraikubId;
      }
      default: {
        return p.kraikubId;
      }
    }
  }

  useEffect(() => {
    if (router.query.state) {
      router.push(where(router.query.state as string))
    }
    else {
      router.push(p.kraikubId)
    }
  }, [router]);

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
