import {
  Heading,
  Box,
  Flex,
  Button,
  VStack,
  Text,
  Center,
  IconButton,
  Divider,
  Container,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { useUser } from "../../../../../contexts/User";
import AppCard2 from "./AppCard2";
import Link from "next/link";
import { useClientTranslation } from "../../../../../hooks/client-translation";
import { dashboardDict } from "../../../../../translate/dashboard";
import { useCookies } from "react-cookie";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { Card } from "../../../../../components/Card";
import { p } from "../../../../../utils/path";
import { CustomDivider } from "../../../../../components/CustomDivider";

interface AppTableProps {
  apps: Application[];
}

const isLimit = (limit: boolean, v1: any, v2: any) => {
  if (!limit) {
    return v1;
  } else {
    return v2;
  }
};

const AppTable: FC<AppTableProps> = ({ apps }) => {
  const { user } = useUser();
  const [c] = useCookies(["LANG"]);

  const { t, ready } = useClientTranslation(dashboardDict);

  const styles = {
    appsContainer: {
      bg: useColorModeValue("white", "gray.700"),
    },
  };

  if (!user) {
    return null;
  }

  if (!ready) {
    return null;
  }

  return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={[12, 12, 8]} minH="100vh">
          <Container maxW="container.md" py="40px">
            <Heading size="lg">{t("page-header")}</Heading>
            <Text mt={2} fontWeight={500} opacity={0.7} fontSize={14}>
              {t("page-quota-msg-1")} {user.appOwned}/{user.appQuota}{" "}
              {t("page-quota-msg-2")}
            </Text>
            <Card
              props={{
                my: 5,
              }}
            >
              <VStack spacing={0}>
                {apps.map((app, index) => (
                  <Box key={`rendered-app-${index}`} w="full">
                    <AppCard2 app={app} key={`app-${app.clientId}`} />
                    {index === apps.length - 1 ? null : <CustomDivider sx={{ my: 0 }}/>}
                  </Box>
                ))}
                <Box mt="40px !important">
                  <Link
                    href={isLimit(
                      user.appOwned >= user.appQuota,
                      `${p.projects}/create`,
                      "quotas"
                    )}
                  >
                    <a>
                      <Button
                        variant="solid"
                        size="lg"
                        gap={2}
                        colorScheme={isLimit(
                          user.appOwned >= user.appQuota,
                          "teal",
                          "red"
                        )}
                        w="full"
                        rounded="full"
                      >
                        {isLimit(
                          user.appOwned >= user.appQuota,
                          <IoIosAddCircle size="22px" />,
                          <IoIosRemoveCircle size="22px" />
                        )}
                        {isLimit(
                          user.appOwned >= user.appQuota,
                          t("page-btn-create"),
                          t("page-btn-quota-exceed")
                        )}
                      </Button>
                    </a>
                  </Link>
                </Box>
              </VStack>
            </Card>
          </Container>
        </GridItem>
        {/* <GridItem
          colSpan={[12, 12, 4]}
          minH="100vh"
          bgColor="gray.800"
          color="white"
        >
          <Container maxW="460px">
            <VStack spacing={8}>
              <OAuthSuggestion />
            </VStack>
          </Container>
        </GridItem> */}
      </Grid>
    </Box>
  );
};
export default AppTable;
