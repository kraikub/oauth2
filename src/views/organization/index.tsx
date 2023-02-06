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
import { useClientTranslation } from "../../hooks/client-translation";
import { useOnClient } from "../../hooks/on-client";
import { DynamicContainer } from "../../layouts/DynamicContainer";
import { orgDict } from "../../translate/org";
import { CreateOrg } from "./components/CreateOrg";
import { DeleteOrg } from "./components/Delete";
import { Invite } from "./components/Invite";
import { NoKraikubID } from "./components/NoKraikubID";
import { UserOrgCard } from "./components/UserOrgCard";

interface OrgDashboardPage {
  org: FullOrganizationDisplayData;
}

export const OrgDashboardPage: FC<OrgDashboardPage> = ({ org }) => {
  const { user } = useUser();
  const ready = useOnClient();
  const { t } = useClientTranslation(orgDict);
  if (!user) {
    return null;
  }

  if (!ready) {
    return null;
  }

  if (!user.personalEmail) {
    return <NoKraikubID />;
  }

  if (!user?.orgId) {
    return (
      <DynamicContainer containerProps={{ maxW: "container.lg" }}>
        <CreateOrg />
      </DynamicContainer>
    );
  }
  const myRoles = org.members.filter((e) => {
    return e.user.uid === user.uid;
  });

  if (!myRoles.length) {
    console.error("Roles does not match in db.");
    return <>Conflict: Roles does not match in db.</>;
  }

  if (myRoles.length !== 1) {
    console.error("Found more than 1 related roles.");
    return <>Conflict: Found more than 1 related roles.</>;
  }

  const myRole = myRoles[0];

  return (
    <DynamicContainer containerProps={{ maxW: "container.lg" }}>
      <Card props={{ p: 0 }}>
        <CardContent props={{ py: 6 }}>
          <HStack spacing={4}>
            <Heading size="md">{org.orgName}</Heading>
            <Badge size="sm" colorScheme="kraikub.green" rounded="full">
              {org.members.length} {t("users")}
            </Badge>
          </HStack>
          <Text
            mt={1}
            opacity={0.6}
            textTransform="uppercase"
            fontWeight={600}
            fontSize={12}
          >
            {t("People in")} {org.orgName}
          </Text>
          <Invite orgId={org.orgId} myRole={myRole} />
        </CardContent>
        <CustomDivider sx={{ py: 0 }} />
        <VStack w="full">
          {myRoles.map((m, index) => {
            return (
              <UserOrgCard
                myRole={myRole}
                orgId={org.orgId}
                member={m}
                key={`me-in-org-${index}`}
                editable={false}
                me
              />
            );
          })}
          {org.members
            .filter((e) => {
              return e.user.uid !== user.uid;
            })
            .map((m, index) => {
              return (
                <UserOrgCard
                  myRole={myRole}
                  orgId={org.orgId}
                  member={m}
                  key={`me-in-org-${index}`}
                  editable={
                    myRole.priority <= 2 && myRole.priority < m.priority
                  }
                />
              );
            })}
        </VStack>
        {myRole.priority === 0 ? (
          <>
            <CustomDivider sx={{ py: 0 }} />
            <DeleteOrg org={org} />
          </>
        ) : null}
      </Card>
    </DynamicContainer>
  );
};
