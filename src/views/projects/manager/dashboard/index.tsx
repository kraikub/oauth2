import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";
import Navbar from "../../../../layouts/Navbar";
import { UserProvider } from "../../../../contexts/User";
import AppTable from "./components/AppTable";
import { FooterShort } from "../../../../layouts/FooterShort";
import { ConnectSection } from "../client/components/ConnectSection";
import OrgAppTable from "./components/OrgAppTable";
import { DynamicContainer } from "../../../../layouts/DynamicContainer";

interface ProjectManagerDashboardProps {
  user: User;
  userApps: Application[];
  org: Organization | null;
  orgApps: Application[];
  role: Role<OrganizationRoleData> | null;
}

export const ProjectManagerDashboard: NextPage<ProjectManagerDashboardProps> = (
  props
) => {
  return (
    <>
      <UserProvider user={props.user}>
        <Navbar />
        <DynamicContainer
          containerProps={{
            maxW: "container.xl",
            minH: "100vh",
          }}
        >
          <Grid templateColumns="repeat(12, 1fr)" gap={2}>
            <GridItem colSpan={[12, 12, 6]}>
              <AppTable apps={props.userApps} />
            </GridItem>
            <GridItem colSpan={[12, 12, 6]}>
              {(props.role && props.role?.priority < 2) ||
              props.role?.priority === 3 ? (
                <OrgAppTable
                  apps={props.orgApps}
                  org={props.org}
                  role={props.role}
                />
              ) : null}
            </GridItem>
          </Grid>
        </DynamicContainer>
        <FooterShort contentSize="container.xl" />
      </UserProvider>
    </>
  );
};
