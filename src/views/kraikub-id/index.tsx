import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "../../components/Card";
import { ClientRender } from "../../components/ClientRender";
import { LinkWrap } from "../../components/LinkWrap";
import { useUser } from "../../contexts/User";
import { useClientTranslation } from "../../hooks/client-translation";
import { useOnClient } from "../../hooks/on-client";
import { DynamicContainer } from "../../layouts/DynamicContainer";
import { dictWhenNoActiveAccount } from "../../translate/kraikubid";
import { AccessesCard } from "./components/AccessesCard";
import { DevicesCard } from "./components/DevicesCard";
import { NotificationCard } from "./components/NotificationCard";
import { OrganizationCard } from "./components/OrganizationCard";
import { UserCard } from "./components/UserCard";

export const KraikubIdPageBody: FC<OAuthActivitiesProps> = (props) => {
  const { user } = useUser();
  const { t } = useClientTranslation(dictWhenNoActiveAccount);
  const sharedHeightBoxNonKraikubId = ["50vh", "80vh"]
  if (!user) {
    return null;
  }

  if (!user.personalEmail) {
    return (
      <DynamicContainer
        containerProps={{
          maxW: "container.xl",
          pt: "20px",
        }}
      >
        <Card
          props={{
            w: "full",
            p: 0,
            overflow: "hidden",
            h: ["auto", "80vh"],
          }}
        >
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem
              colSpan={[12, 4]}
              position="relative"
              h={sharedHeightBoxNonKraikubId}
              backgroundImage="url(https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06085555/dribbble_1.gif)"
              backgroundSize="cover"
              backgroundPosition="center"
            >
              <Box
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                bg="blackAlpha.600"
                backdropFilter="blur(20px)"
                py={8}
                px={6}
                color="white"
                zIndex={45}
              >
                <Text textTransform="uppercase" fontWeight={600} fontSize={12}>
                  KRAIKUB ID
                </Text>
                <Heading size="md" fontWeight={500} mt={2}>
                  The most innovative way to use your university account
                </Heading>
                <Text mt={3} opacity={0.6} fontSize={12}>
                  KRAIKUB ID is one of the most advanced university account ever
                  created.
                </Text>
                <LinkWrap href="/id/activate">
                  <Button
                    size="lg"
                    w="full"
                    fontWeight={600}
                    mt={16}
                    px={14}
                    bg="white"
                    color="blackAlpha.700"
                    textTransform="uppercase"
                    fontSize={14}
                  >
                    {t("btn-activate")}
                  </Button>
                </LinkWrap>
              </Box>
            </GridItem>
            <GridItem
              colSpan={[12, 8]}
              backgroundImage="url(https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06085555/dribbble_1.gif)"
              backgroundSize="cover"
              backgroundPosition="center"
              h={sharedHeightBoxNonKraikubId}
            ></GridItem>
          </Grid>
        </Card>
      </DynamicContainer>
    );
  }

  return (
    <DynamicContainer
      containerProps={{
        maxW: "container.xl",
      }}
    >
      <Grid templateColumns="repeat(12, 1fr)" columnGap={4} rowGap={4} w="full">
        <GridItem colSpan={[12, 12, 8]}>
          <VStack spacing={4}>
            <UserCard user={user} />
            <DevicesCard logs={props.logs} />
            <AccessesCard accesses={props.accesses} />
          </VStack>
        </GridItem>
        <GridItem colSpan={[12, 12, 4]}>
          <VStack spacing={4}>
            <OrganizationCard user={user} />
            <NotificationCard user={user} />
          </VStack>
        </GridItem>
      </Grid>
      <VStack spacing={4}>
        {/* <UserCard user={user} />
        <Grid
          templateColumns="repeat(12, 1fr)"
          columnGap={6}
          rowGap={6}
          w="full"
        >
          <GridItem colSpan={[12, 12, 5]}>
            <NotificationCard user={user} />
          </GridItem>
          <GridItem colSpan={[12, 12, 7]}>
            <DevicesCard logs={props.logs} />
          </GridItem>
        </Grid>
        <AccessesCard accesses={props.accesses} /> */}
      </VStack>
    </DynamicContainer>
  );
};
