import { Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Navbar from "../../../../layouts/Navbar";
import { UserProvider } from "../../../../contexts/User";
import AppTable from "./components/AppTable";
import ProjectOwner from "./components/ProjectOwner";

export const ProjectManagerDashboard: NextPage = () => {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Container maxW="container.lg">
          <AppTable />
        </Container>
      </UserProvider>
    </>
  );
};
