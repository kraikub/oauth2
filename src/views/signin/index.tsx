import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Code,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import { Application } from "../../../db/schema/application";
import { authService } from "../../services/authService";
import { Query } from "../../types/query";
import { PrimaryInput } from "./PrimaryInput";
import { MdPrivacyTip } from "react-icons/md";
import ogImage from "../../../public/og-image.png";
interface SigninPageProps {
  query: Query;
  app: Application | null;
  onSigninComplete?: (access: string, refresh: string) => void;
}

const SigninPage: FC<SigninPageProps> = ({ app, query, onSigninComplete }) => {
  const router = useRouter();
  const [pdpaAgreed, setPdpaAgreed] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigninButtonLoading, setIsSigninLoading] = useState<boolean>(false);

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
        query.secret as string | undefined
      );
      if (onSigninComplete) {
        return onSigninComplete(data.payload.access, data.payload.refresh);
      }
      return router.push(data.payload.url);
    } catch (error) {
      setIsSigninLoading(false);
      console.error(error)
      alert("Sign in failed, please try again.");
    }
  };
  if (app === null || query.scope === null) {
    return (
      <Fragment>
        <Head>
          <title>Invalid Signin URL - ลิงค์ของคุณไม่สามารถใช้งานได้</title>
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="เราไม่สามารถดำเนินการลิงค์ของคุณได้ คุณควรที่จะตรวจสอบความถูกต้องของลิงค์ของคุณหรือติดต่อผู้พัฒนาแอปพลิเคชั่นที่เกี่ยวข้องกับคุณ"
          />
          <meta name="author" content="Kraikub Official" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Container maxW={500} minH="100vh">
          <Center h="100vh">
            <VStack spacing={5} textAlign="center">
              <Heading fontWeight={500}>🤔</Heading>
              <Heading size="md" fontWeight={500}>
                เกิดข้อผิดพลาดขึ้น | Invalid Signin URL
              </Heading>
              <Text>ดูเหมือนว่าเราไม่สามารถดำเนินการลิงค์ของคุณได้</Text>
              <Text color="gray.500">
                คุณควรที่จะตรวจสอบความถูกต้องของลิงค์ของคุณหรือติดต่อผู้พัฒนาแอปพลิเคชั่นที่เกี่ยวข้องกับคุณ
              </Text>
              <HStack mt="50px !important">
                <Button colorScheme="katrade.scheme.fix" rounded="full">แจ้งปัญหากับ Kraikub</Button>
              </HStack>
            </VStack>
          </Center>
        </Container>
      </Fragment>
    );
  }

  if (query.dev === "true" && query.secret !== app?.secret) {
    return (
      <Fragment>
        <Head>
          <title>Authorization failed</title>
          <meta charSet="UTF-8" />
          <meta name="description" content="Invalid OAuth login credentials." />
          <meta name="author" content="Kraikub Official" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Container maxW={500} minH="100vh">
          <Center h="100vh">
            <VStack spacing={5} textAlign="center">
              <Heading fontWeight={500}>⚠️</Heading>
              <Heading size="md" fontWeight={500}>
                Secret authorization failed
              </Heading>
              <Text>
                We could not authorize your app secret with{" "}
                <strong>{app.appName}</strong>
              </Text>
              <Text color="gray.700">
                Please contact your app developers or try the tip below.
              </Text>
              <Alert status="warning" rounded={8} textAlign="start">
                <AlertIcon />
                <Text fontSize={12} fontWeight={700}>
                  Tip: If you are using developer mode. Please provide{" "}
                  <Code fontSize={12} bg="white" color="pink.400">
                    dev=true&secret={"<your-app-secret>"}
                  </Code>{" "}
                  as a query string in your signin url. App secret can be found
                  in your application details page.
                </Text>
              </Alert>
              <HStack mt="50px !important">
                <Button colorScheme="katrade.scheme.fix" rounded="full">แจ้งปัญหากับ Kraikub</Button>
              </HStack>
            </VStack>
          </Center>
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Signin with KU</title>
        <meta property="og:title" content={`Katrade - Sign in with KU`} />
        <meta
          property="og:description"
          content={`Sign in to ${app.appName} with your Kasetsart Account.`}
        />
        <meta property="og:image" content={ogImage.src} />
      </Head>
      <Container maxW={500} minH="100vh" py="4%">
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
          >
            <Heading fontSize="22px" fontWeight={800} letterSpacing={-1}>
              Sign in with KU Account
            </Heading>
            <Box mt="30px" w="full">
              <Text fontSize={14}>
                <Box as="span" fontWeight={700} color="katrade.main">
                  {app.appName}
                </Box>
                {" wants you to sign in to their app."}
              </Text>
            </Box>
            <Box mt="10px" w="full">
              <Text fontSize={12} fontWeight={500}>
                KU Username
              </Text>
              <PrimaryInput
                placeholder="Ex. b621050XXXX"
                onChange={handleUsernameChange}
                value={username}
              />
              <Text fontSize={12} mt={5} fontWeight={500}>
                Password
              </Text>
              <PrimaryInput
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </Box>
            <Box
              bg="green.50"
              px="30px"
              py="12px"
              rounded={4}
              w="full"
              border="1px solid"
              borderColor="green.100"
            >
              <HStack spacing={2}>
                <Heading fontWeight={700} fontSize="14px" color="gray.600">
                  Data Privacy Warning
                </Heading>
                <MdPrivacyTip size="20px" />
              </HStack>
              <Divider my="10px" />
              <Text fontSize={12}>
                <Box as="span" fontWeight={600} color="katrade.main">
                  {app.appName}
                </Box>{" "}
                want to access these personal data.
              </Text>
              <UnorderedList
                fontSize="12px"
                fontWeight={500}
                my={6}
                color="gray.800"
              >
                <ListItem>Your full name.</ListItem>
                <ListItem>Phone number and email.</ListItem>
                <ListItem>Educational data such as faculty, major.</ListItem>
              </UnorderedList>
            </Box>
            <Checkbox
                colorScheme="katrade"
                isChecked={pdpaAgreed}
                onChange={(e) => setPdpaAgreed(e.target.checked)}
              >
                <Text fontSize={12} fontWeight={600}>
                  I agree to share my data which is held by Kasetsart University
                  with Kraikub and applications on Kraikub platform.
                </Text>
              </Checkbox>
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
              Sign in
            </Button>
          </Flex>
        </form>
      </Container>
      {/* <Footer /> */}
    </Fragment>
  );
};
export default SigninPage;
