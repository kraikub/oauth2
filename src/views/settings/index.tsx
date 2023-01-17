import {
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Card } from "../../components/Card";
import { CustomDivider } from "../../components/CustomDivider";
import { SmartLanguageToggler } from "../../components/SmartLanguageToggler";
import { ThemeToggler } from "../../components/ThemeToggler";
import { UserProvider } from "../../contexts/User";
import { useClientTranslation } from "../../hooks/client-translation";
import { useOnClient } from "../../hooks/on-client";
import Navbar from "../../layouts/Navbar";
import { settingsDict } from "../../translate/settings";

interface SettingPageProps {
  user: UserWithStudent;
}

export const SettingPage: NextPage<SettingPageProps> = (props) => {
  const ready = useOnClient();
  const { t } = useClientTranslation(settingsDict);
  return (
    <UserProvider user={props.user}>
      <Navbar />
      <Container maxW="container.md" my="100px">
        <Card>
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={8}>
              <Heading size="md">{t("topic-languages")}</Heading>
              <Text fontSize={12} opacity={0.7} mt={2}>
                {t("topic-languages-description")}
              </Text>
            </GridItem>
            <GridItem colSpan={4}>
              <HStack justifyContent="end" flexWrap="wrap">
                <Text>{t("option-languages-switch")}</Text>
                <SmartLanguageToggler
                  sx={{
                    size: "sm",
                  }}
                />
              </HStack>
            </GridItem>
          </Grid>
          <CustomDivider
            sx={{
              my: 6,
            }}
          />
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={8}>
              <Heading size="md">{t("topic-dark")}</Heading>
              <Text fontSize={12} opacity={0.7} mt={2}>
                {t("topic-dark-description")}
              </Text>
            </GridItem>
            <GridItem colSpan={4}>
              <HStack justifyContent="end">
                <ThemeToggler />
              </HStack>
            </GridItem>
          </Grid>
        </Card>
      </Container>
    </UserProvider>
  );
};
