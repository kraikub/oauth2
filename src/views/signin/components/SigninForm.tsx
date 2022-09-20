import {
  Container,
  Flex,
  Heading,
  HStack,
  Divider,
  Checkbox,
  Button,
  Box,
  Text,
  Center,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import { MdPrivacyTip } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { Application } from "../../../../db/schema/application";
import { authService } from "../../../services/authService";
import { Query } from "../../../types/query";
import { PrimaryInput } from "../PrimaryInput";
import { ScopeBadge } from "./ScopeBadge";
import anonymous from "../../../../public/anonymous.png";
interface SigninFormProps {
  query: Query;
  app: Application | null;
  secret?: string;
  onSigninComplete?: (
    access: string,
    refresh: string,
    u: PublicUserData
  ) => void;
}

export const SigninForm: FC<SigninFormProps> = ({
  query,
  app,
  onSigninComplete,
  secret,
}) => {
  const router = useRouter();
  const [pdpaAgreed, setPdpaAgreed] = useState<boolean>(query.scope === "0");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigninButtonLoading, setIsSigninLoading] = useState<boolean>(false);
  const styles = {
    anonymous: {
      body: {
        bg: "#000",
      },
      card: {
        bg: "#1b1c1c",
        color: "white",
      },
      dataControl: {
        bg: "#ffffff10",
      },
      highlight: {
        color: "katrade.400",
      },
      input: {
        backgroundColor: "#252526",
        placeholderColor: "#4b4d4f",
      },
      signinText: "Sign in Anonymously",
    },
    regular: {
      body: {
        bg: "#fff",
      },
      card: {
        bg: "#fff",
        color: "black",
      },
      dataControl: {
        bg: "#00000008",
      },
      highlight: {
        color: "katrade.600",
      },
      input: {
        backgroundColor: "#00000008",
        placeholderColor: "#b0b3b8",
      },
      signinText: "Sign in",
    },
  };
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const bindStringToBoolean = (
    text?: string | string[] | null | undefined
  ): boolean | undefined => {
    if (text === "true") return true;
    else if (text === "false") return false;
    return undefined;
  };

  const themeSelector = (styles: { regular: any; anonymous: any }) => {
    return query.scope === "0" ? styles.anonymous : styles.regular;
  };

  const handleSigninEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (app == null || query.scope === null) return;
    setIsSigninLoading(true);
    if (!username || !password) {
      setIsSigninLoading(false);
      return alert("Some field is missing.");
    }
    try {
      const { data } = await authService.signin(
        username,
        password,
        app.clientId,
        query.scope as string,
        query.ref as string,
        bindStringToBoolean(query.dev),
        secret || (query.secret as string | undefined)
      );
      if (onSigninComplete) {
        return onSigninComplete(
          data.payload.access,
          data.payload.refresh,
          data.payload.user
        );
      }
      return router.push(data.payload.url);
    } catch (error) {
      setIsSigninLoading(false);
      console.error(error);
      alert("Sign in failed, please try again.");
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Signin with KU</title>
        <meta property="og:title" content={`Katrade - Sign in with KU`} />
        <meta
          property="og:description"
          content={`Sign in to ${app?.appName} with your Kasetsart Account.`}
        />
      </Head>
      <Box {...themeSelector(styles).body}>
        <Container maxW={500} minH="100vh" py="4%">
          {query.scope === "0" ? (
            <Center mb={4}>
              <Box p={2} bg="white" rounded="full">
                <Image src={anonymous.src} alt="data-icon" h="40px" />
              </Box>
            </Center>
          ) : null}

          <form onSubmit={handleSigninEvent}>
            <Flex
              boxShadow="0 6px 30px 20px #00000010"
              rounded={16}
              minH="60vh"
              h="auto"
              px="30px"
              py="40px"
              direction="column"
              alignItems="center"
              gap="20px"
              justifyContent="space-between !important"
              {...themeSelector(styles).card}
            >
              <Heading fontSize="22px" fontWeight={800} letterSpacing={-1}>
                Sign in with KU Account
              </Heading>
              <Box mt="30px" w="full">
                <Text fontSize={14}>
                  <Box
                    as="span"
                    fontWeight={700}
                    {...themeSelector(styles).highlight}
                  >
                    {app?.appName}
                  </Box>
                  {" wants you to sign in to their app."}
                </Text>
              </Box>
              <Box mt="10px" w="full">
                <Text fontSize={12} fontWeight={700}>
                  KU Username
                </Text>
                <PrimaryInput
                  placeholder="Ex. b621050XXXX"
                  onChange={handleUsernameChange}
                  value={username}
                  {...themeSelector(styles).input}
                />
                <Text fontSize={12} mt={5} fontWeight={700}>
                  Password
                </Text>
                <PrimaryInput
                  placeholder="Password"
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                  {...themeSelector(styles).input}
                />
              </Box>
              <Box
                px="20px"
                py="12px"
                rounded={10}
                w="full"
                {...themeSelector(styles).dataControl}
              >
                <HStack spacing={2}>
                  <Heading fontWeight={700} fontSize="14px">
                    Data Protection
                  </Heading>
                  <MdPrivacyTip size="20px" />
                </HStack>
                <Divider my="10px" />
                <Text fontSize={12} fontWeight={700}>
                  {query.scope === "0" ? (
                    `Your data won't be shared with ${app?.appName}`
                  ) : (
                    <>
                      <Box as="span" {...themeSelector(styles).highlight}>
                        {app?.appName}
                      </Box>{" "}
                      want to access these personal data.
                    </>
                  )}
                </Text>
                {query.scope === "0" ? null : (
                  <Flex flexWrap="wrap" gap={3} my={4}>
                    <ScopeBadge>
                      <RiAccountCircleFill />
                      Full Name
                    </ScopeBadge>
                  </Flex>
                )}
              </Box>
              {query.scope === "0" ? null : (
                <Checkbox
                  colorScheme="katrade.scheme.fix"
                  isChecked={pdpaAgreed}
                  onChange={(e) => setPdpaAgreed(e.target.checked)}
                >
                  <Text fontSize={12} fontWeight={600}>
                    I agree to share my data which is held by Kasetsart
                    University with Kraikub and applications on Kraikub
                    platform.
                  </Text>
                </Checkbox>
              )}

              <Button
                mt="5px"
                h="70px"
                w="full"
                colorScheme="katrade.scheme.fix"
                fontSize="1rem"
                fontWeight={700}
                rounded={6}
                isLoading={isSigninButtonLoading}
                _hover={{
                  boxShadow: "0 0 10px #00000030",
                }}
                type="submit"
                disabled={!pdpaAgreed}
              >
                {themeSelector(styles).signinText}
              </Button>
            </Flex>
          </form>
        </Container>
      </Box>
    </Fragment>
  );
};
