import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Container,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Highlight } from "@chakra-ui/react";
import { Card } from "../../../../../components/Card";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useOnClient } from "../../../../../hooks/on-client";
import { useClientTranslation } from "../../../../../hooks/client-translation";
import { connectionComponentDict } from "../../../../../translate/connection";

interface ConnectSectionProps {
  app: Application | null;
}

export const ConnectSection: FC<ConnectSectionProps> = ({ app }) => {
  const ready = useOnClient();
  const { t } = useClientTranslation(connectionComponentDict);
  const boxBgColor = useColorModeValue("gray.400", "gray.600");
  const gridBorderDividerColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.200"
  );
  if (!ready) {
    return null;
  }

  return (
    <Container maxW="container.xl">
      <Card>
        <Grid templateColumns="repeat(12, 1fr)" columnGap={6} rowGap={4}>
          <GridItem
            colSpan={[12, 12, 5]}
            borderStyle={["none", "solid"]}
            borderWidth="0 1px 0 0"
            borderColor={gridBorderDividerColor}
            pe={[0, 8]}
          >
            <Text>
              <Text me={3} as="span" opacity={0.4} fontSize={12}>
                1
              </Text>
              <Text as="span" fontWeight={600} letterSpacing={1}>
                {t("connect-step-1-header")}
              </Text>
            </Text>
            <VStack alignItems="start" spacing={6} mt={8} mb={3}>
              <Box w="full">
                <Text opacity={0.6} fontSize={14} mb={2} fontWeight={600}>
                  CLIENT ID
                </Text>
                <Input
                  variant="outline"
                  value={app?.clientId}
                  fontWeight={600}
                  fontSize={12}
                  onChange={() => {}}
                />
              </Box>
              <Box w="full">
                <Text opacity={0.6} fontSize={14} mb={2} fontWeight={600}>
                  SECRET
                </Text>
                <Input
                  variant="outline"
                  fontWeight={600}
                  fontSize={12}
                  value={app?.secret}
                  onChange={() => {}}
                />
              </Box>
              <Text fontSize={12} opacity={0.5}>
                {t("connect-step-1-tip-client-id")}
              </Text>
              <Text fontSize={12} opacity={0.5}>
                {t("connect-step-1-tip-secret")}
              </Text>
              <Button size="sm" colorScheme="teal" gap={2}>
                {t("connect-step-1-btn-safety")}{" "}
                <IoIosArrowRoundForward size="20px" />
              </Button>
            </VStack>
          </GridItem>
          <GridItem colSpan={[12, 12, 7]}>
            <Text>
              <Text me={3} as="span" opacity={0.4} fontSize={12}>
                2
              </Text>
              <Text as="span" fontWeight={600} letterSpacing={1}>
                {t("connect-step-2-header")}
              </Text>
            </Text>
            <Box mt={8} mb={3}>
              <Text opacity={0.5} fontWeight={600}>
                {t("connect-step-2-description")}{" "}
              </Text>
              <Box
                p={4}
                rounded={8}
                my={4}
                borderColor={boxBgColor}
                borderStyle="solid"
                borderWidth={1}
                fontWeight={600}
                fontSize={14}
              >
                <Highlight
                  query={["<redirect-url>"]}
                  styles={{
                    bg: "teal.200",
                    py: "0.008em",
                  }}
                >
                  {`https://app.kraikub.com/signin?client_id=${app?.clientId}&scope=openid&redirect_uri=<redirect-url>`}
                </Highlight>
              </Box>
            </Box>
            <ButtonGroup justifyContent="end" w="full">
              <Link href="https://play.kraikub.com">
                <a target="_blank">
                  <Button gap={2}>
                    {t("connect-step-2-btn-demo")}{" "}
                    <IoIosArrowRoundForward size="20px" />
                  </Button>
                </a>
              </Link>
            </ButtonGroup>
          </GridItem>
        </Grid>
      </Card>
    </Container>
  );
};
