import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export const CookieConsentScreen = () => {
  const { t } = useTranslation("signin")
  const [cookie, setCookie] = useCookies(["ACCEPT_COOKIES"])

  const acceptWithChoice = (c: string) => {
    setCookie("ACCEPT_COOKIES", c);
    location.reload();
  }

  return (
    <Box w="100%">
      <VStack spacing={3} alignItems="start">
        <Heading size="lg">{t("cookie-consent-header")}</Heading>
        <Text size="md">
        {t("cookie-consent-description")}
        </Text>
      </VStack>
      <ButtonGroup justifyContent="end" w="full" my={5}>
        <Button onClick={() => acceptWithChoice("nesc")}>{t("cookie-consent-btn-nesc")}</Button>
        <Button onClick={() => acceptWithChoice("all")}>{t("cookie-consent-btn-all")}</Button>
      </ButtonGroup>
    </Box>
  );
};