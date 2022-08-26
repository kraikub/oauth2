import { GetServerSideProps, NextPage } from "next";
import { applicationRepository } from "../../../api/repositories/application";
import { Application } from "../../../db/schema/application";
import { UserProvider } from "../../../src/contexts/User";
import ClientPage from "../../../src/views/projects/manager/client";

interface ClientPageProps {
  app: Application | null;
}

const Client: NextPage<ClientPageProps> = ({ app }) => {
  return (
    <UserProvider>
      <ClientPage  />
    </UserProvider>
  );
};


export default Client;
