import { FC, useEffect, useState } from "react";
import Navbar from "../../../../layouts/Navbar";

import { Application } from "../../../../../db/schema/application";
import { useRouter } from "next/router";
import { appService } from "../../../../services/appService";
import { FieldContainer } from "./components/FieldContainer";
import { AppForm } from "./components/AppForm";
interface ClientPageProps {}

const ClientPage: FC<ClientPageProps> = ({}) => {
  const router = useRouter();
  const { clientId } = router.query;
  const [app, setApp] = useState<Application>();

  const getApp = async () => {
    if (!clientId) return;
    const ac = localStorage.getItem("access");
    if (!ac) return; //
    try {
      const res = await appService.getApplication(clientId as string, ac);
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
      {app ? <AppForm app={app} /> : null}
    </>
  );
};

export default ClientPage;
