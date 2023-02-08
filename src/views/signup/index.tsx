import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  Input,
  Progress,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, SyntheticEvent, useRef, useState } from "react";
import { createUsername } from "../../../api/utils/string";
import { Card } from "../../components/Card";
import { CustomInput } from "../../components/inputs/Input";
import { useClientTranslation } from "../../hooks/client-translation";
import { useOnClient } from "../../hooks/on-client";
import StaticNavbar from "../../layouts/StaticNavbar";
import { internalServiceApi } from "../../services/internalService";
import { signupDict } from "../../translate/signup";
import { Complete } from "./components/Complete";

export const SignUpPage: FC = () => {
  const { t } = useClientTranslation(signupDict);
  const ready = useOnClient();
  const [errText, setErrText] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<string>("");
  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrText(undefined);
    try {
      const target = e.target as typeof e.target & {
        firstName: { value: string };
        lastName: { value: string };
        email: { value: string };
        accountType: { value: string };
        username: { value: string };
      };
      const res = await internalServiceApi.signUp({
        firstName: target.firstName.value,
        lastName: target.lastName.value,
        accountType: target.accountType.value,
        email: target.email.value,
        username: target.username.value,
      });
      if (res.status !== 200) {
        return console.warn(res.status, res.data);
      }
      emailRef.current = target.email.value;
      setSuccess(true);
    } catch (error) {
      // console.error(error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        (error.response.data as CustomApiResponse<any>).message
      ) {
        setErrText((error.response.data as CustomApiResponse<any>).message);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  if (!ready) {
    return null;
  }

  return (
    <>
      <StaticNavbar />
      <Container maxW="container.sm" my={10}>
        {success ? (
          <Complete email={emailRef.current} />
        ) : (
          <>
            {errText ? (
              <Alert status="error" mb={6} rounded={8} fontWeight={600}>
                <AlertIcon />
                {t(errText)}
              </Alert>
            ) : null}

            <Card
              props={{
                pt: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box position="absolute" top={0} left={0} right={0}>
                {loading ? (
                  <Progress
                    colorScheme="kraikub.green.always"
                    size="xs"
                    isIndeterminate
                  />
                ) : null}
              </Box>
              <Heading size="md">{t("title")}</Heading>
              <Text fontSize={12} fontWeight={400} opacity={0.7} mt={2}>
                {t("note")}
              </Text>
              <form onSubmit={handleFormSubmit}>
                <VStack mt={8} alignItems="start" spacing={10}>
                  <HStack flexWrap="wrap" spacing={[0, 2]} rowGap={8}>
                    <CustomInput
                      maxW={["100%", "200px"]}
                      placeholder={t("first-name")}
                      name="firstName"
                      isRequired
                    />
                    <CustomInput
                      maxW={["100%", "200px"]}
                      placeholder={t("last-name")}
                      name="lastName"
                      isRequired
                    />
                  </HStack>
                  <VStack spacing={2} alignItems="start" w="full">
                    <Text fontSize={14} fontWeight={400}>
                      {t("email")}{" "}
                      <Box as="span" opacity={0.7}>
                        {t("email-description")}
                      </Box>
                    </Text>
                    <CustomInput
                      maxW={["100%", "400px"]}
                      placeholder={t("email")}
                      type="email"
                      name="email"
                      isRequired
                    />
                  </VStack>
                  <VStack spacing={2} alignItems="start" w="full">
                    <Text fontSize={14} fontWeight={400}>
                      {t("username")}{" "}
                    </Text>
                    <CustomInput
                      maxW={["100%", "400px"]}
                      placeholder={t("username-placeholder")}
                      name="username"
                      isRequired
                    />
                  </VStack>
                  <VStack spacing={2} alignItems="start" w="full">
                    <Text>{t("account-type-question")}</Text>
                    <Select
                      placeholder={t("select-placeholder")}
                      size="sm"
                      maxW={["100%", "200px"]}
                      name="accountType"
                      required
                    >
                      <option value="personal">{t("personal")}</option>
                      <option value="corporate">{t("corporate")}</option>
                    </Select>
                  </VStack>
                  <ButtonGroup justifyContent="end" w="full">
                    <Button
                      colorScheme="kraikub.green.always"
                      color="white"
                      type="submit"
                      isLoading={loading}
                    >
                      {t("btn-continue")}
                    </Button>
                  </ButtonGroup>
                </VStack>
              </form>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};
