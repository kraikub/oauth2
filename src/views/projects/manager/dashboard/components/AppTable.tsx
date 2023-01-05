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

  const buttonWhenHover = {
    bg: useColorModeValue("blackAlpha.50", "whiteAlpha.50")
  }

  if (!user) {
    return null;
  }

  if (!ready) {
    return null;
  }

  return (
    <Box py={10}>
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={[12, 12, 8]} minH="100vh">
          <Heading size="md">{t("page-header")}</Heading>
          <Text mt={2} fontWeight={500} opacity={0.7} fontSize={14}>
            {t("page-quota-msg-1")} {user.appOwned}/{user.appQuota}{" "}
            {t("page-quota-msg-2")}
          </Text>
          <Card
            props={{
              my: 5,
              p: 0,
            }}
          >
            <VStack spacing={0}>
              {apps.map((app, index) => (
                <Box key={`rendered-app-${index}`} w="full">
                  <AppCard2 app={app} key={`app-${app.clientId}`} />
                  {index === apps.length - 1 ? null : (
                    <Box ps={8}>
                      <CustomDivider sx={{ my: 0 }} />
                    </Box>
                  )}
                </Box>
              ))}
              <CustomDivider />
              <Box w="full">
                <Link
                  href={isLimit(
                    user.appOwned >= user.appQuota,
                    `${p.projects}/create`,
                    "quotas"
                  )}
                >
                  <a>
                    <Button
                      w="full"
                      h="60px"
                      variant="unstyled"
                      size="lg"
                      fontWeight={600}
                      gap={2}
                      _hover={buttonWhenHover}
                      color={isLimit(
                        user.appOwned >= user.appQuota,
                        "teal.400",
                        "red.400"
                      )}
                    >
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
