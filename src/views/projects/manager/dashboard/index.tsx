import { Box, Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Navbar from "../../../../layouts/Navbar";
import { UserProvider } from "../../../../contexts/User";
import AppTable from "./components/AppTable";
import { FooterShort } from "../../../../layouts/FooterShort";

export const ProjectManagerDashboard: NextPage = () => {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Box minH="100vh">
          <Container maxW="container.xl">
            <AppTable />
          </Container>
        </Box>
        <FooterShort />
      </UserProvider>
    </>
  );
};
