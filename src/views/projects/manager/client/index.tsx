import { FC, useEffect, useState } from "react";
import Navbar from "../../../../layouts/Navbar";
import { useRouter } from "next/router";
import { appService } from "../../../../services/appService";
import { FieldContainer } from "./components/FieldContainer";
import { AppForm } from "./components/AppForm";
import { Box, Center } from "@chakra-ui/react";
import { InterWindLoader } from "../../../../layouts/Loader";
interface ClientPageProps {}

const ClientPage: FC<ClientPageProps> = ({}) => {
  const router = useRouter();
  const { clientId } = router.query;
  const [app, setApp] = useState<Application>();

  const getApp = async () => {
    if (!clientId) return;
    try {
      const res = await appService.getApplication(clientId as string);
      console.log(res);
      if (res) {
        setApp(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!clientId) return;
    getApp();
  }, [clientId]);

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
