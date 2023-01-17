import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Card, CardContent } from "../../components/Card";
import { CustomDivider } from "../../components/CustomDivider";
import { useUser } from "../../contexts/User";
import { CreateOrg } from "./components/CreateOrg";
import { Invite } from "./components/Invite";
import { UserOrgCard } from "./components/UserOrgCard";

interface OrgDashboardPage {
  org: FullOrganizationDisplayData;
}

export const OrgDashboardPage: FC<OrgDashboardPage> = ({ org }) => {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return (
    <Container maxW="container.lg" py="20px">
      {!user?.orgId ? (
        <CreateOrg />
      ) : (
        <Card props={{ p: 0 }}>
          <CardContent props={{ py: 6 }}>
            <HStack spacing={4}>
              <Heading size="md">{org.orgName}</Heading>
              <Badge size="sm" colorScheme="kraikub.blue" rounded="full">
                {org.members.length} users
              </Badge>
            </HStack>
            <Text mt={1} opacity={0.6}>
              Meet these people in {"Organization"}
            </Text>
            <Invite orgId={org.orgId} />
          </CardContent>
          <CustomDivider sx={{ py: 0 }} />
          <VStack w="full">
            {org.members
              .filter((e) => {
                return e.user.uid === user.uid;
              })
              .map((m, index) => {
                return (
                  <UserOrgCard m={m} key={`me-in-org-${index}`} editable />
                );
              })}
               {org.members
              .filter((e) => {
                return e.user.uid !== user.uid;
              })
              .map((m, index) => {
                return (
                  <UserOrgCard m={m} key={`me-in-org-${index}`} editable />
                );
              })}
          </VStack>
        </Card>
      )}
    </Container>
  );
};
