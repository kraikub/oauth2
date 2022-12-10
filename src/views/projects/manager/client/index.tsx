import { FC, useEffect, useState } from "react";
import Navbar from "../../../../layouts/Navbar";
import { useRouter } from "next/router";
import { AppForm } from "./components/AppForm";
import { Center } from "@chakra-ui/react";
import { InterWindLoader } from "../../../../layouts/Loader";

const ClientPage: FC<ClientPageServerSideProps> = ({ app, permission }) => {
  const router = useRouter();
  const { clientId } = router.query;

  return (
    <>
      <Navbar />
      {app ? <AppForm app={app} /> : (
        <Center my="100px">
          <InterWindLoader />
        </Center>
      )}
    </>
  );
};

export default ClientPage;
