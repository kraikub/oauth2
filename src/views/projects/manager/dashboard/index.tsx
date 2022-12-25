import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import Navbar from "../../../../layouts/Navbar";
import { UserProvider } from "../../../../contexts/User";
import AppTable from "./components/AppTable";
import { FooterShort } from "../../../../layouts/FooterShort";
import { ConnectSection } from "../client/components/ConnectSection";

interface ProjectManagerDashboardProps {
  data: UserWithApplication;
}

export const ProjectManagerDashboard: NextPage<ProjectManagerDashboardProps> = (
  props
) => {
  return (
    <>
      <UserProvider user={props.data}>
        <Navbar />
        <Box minH="100vh">
          <AppTable apps={props.data.applications} />
        </Box>
        <FooterShort contentSize="container.xl" />
      </UserProvider>
    </>
  );
};
