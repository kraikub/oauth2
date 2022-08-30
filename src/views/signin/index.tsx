import {
  Alert,
  AlertIcon,
  Avatar,
  Badge,
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
import { RiAccountCircleFill } from "react-icons/ri";
import { ScopeBadge } from "./components/ScopeBadge";
import { AiFillInfoCircle } from "react-icons/ai";
import bg3 from "../../../public/bg-3.png";
import { DataTips } from "../../components/DataTips";
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
      console.error(error);
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
        <Box bgImage={bg3.src}>
          <Container maxW={500} minH="100vh">
            <Center h="100vh" color="white">
              <VStack gap={5} textAlign="center">
                <Heading fontWeight={500}>🤔</Heading>
                <Heading>Invalid sign in URL</Heading>
                <Text fontSize={20}>
                  We cannot validate your sign in request.
                </Text>
                <Box
                  maxW={400}
                  textAlign="start"
                  bg="white"
                  color="black"
                  px={4}
                  py={6}
                  rounded={10}
                  my="30px !important"
                  position="relative"
                >
                  <Box position="absolute" top="15px" right="15px">
                    <AiFillInfoCircle size="26px" />
                  </Box>
                  <Heading size="md" mb={3}>
                    What should I do next?
                  </Heading>
                  <Divider my={4} />
                  <Text fontSize={14} mb={3}>
                    If you are the developers of this app, the On-device signin
                    is not working properly. Check your source code or contact
                    our admins.
                  </Text>
                  <Text fontSize={14} mb={3}>
                    If you are a user, the app that you are using is working
                    wrong.
                  </Text>
                </Box>
              </VStack>
            </Center>
          </Container>
        </Box>
      </Fragment>
    );
  }

  if (query.dev === "true" && query.secret !== app?.secret) {
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
        <Box bgImage={bg3.src}>
          <Container maxW={500} minH="100vh">
            <Center h="100vh" color="white">
              <VStack gap={5} textAlign="center">
                <Heading fontWeight={500}>⚠️</Heading>
                <Heading>Unauthorized</Heading>
                <Text fontSize={20}>
                  This application are not allowed to use the sign in service.
                  It might be misconfigured by the developers or might be
                  harmful!
                </Text>
                <Box
                  maxW={400}
                  textAlign="start"
                  bg="white"
                  color="black"
                  px={4}
                  py={6}
                  rounded={10}
                  my="30px !important"
                  position="relative"
                >
                  <Box position="absolute" top="15px" right="15px">
                    <AiFillInfoCircle size="26px" />
                  </Box>
                  <Heading size="md" mb={3}>
                    {"What's hapenning?"}
                  </Heading>
                  <Divider my={4} />
                  <Text fontSize={14} mb={3}>
                    This application {`"${app?.appName}"`} tries to let you sign
                    in to their app. But we are not sure that this is a real{" "}
                    {`"${app?.appName}"`} app.
                  </Text>
                  <Text fontSize={14} mb={3}>
                    <strong>Tip for devs:</strong> Your application secret is
                    not correct.
                  </Text>
                </Box>
              </VStack>
            </Center>
          </Container>
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <DataTips />
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
            <Box bg="gray.100" px="20px" py="12px" rounded={4} w="full">
              <HStack spacing={2}>
                <Heading fontWeight={700} fontSize="14px">
                  Data Protection
                </Heading>
                <MdPrivacyTip size="20px" />
              </HStack>
              <Divider my="10px" />
              <Text fontSize={12} fontWeight={700}>
                <Box as="span" color="katrade.main">
                  {app.appName}
                </Box>{" "}
                want to access these personal data.
              </Text>
              <Flex flexWrap="wrap" gap={3} my={4}>
                <ScopeBadge>
                  <RiAccountCircleFill />
                  Full Name
                </ScopeBadge>
              </Flex>
            </Box>
            <Checkbox
              colorScheme="katrade.scheme.fix"
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
    </Fragment>
  );
};
export default SigninPage;
