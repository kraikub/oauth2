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
  Switch,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { FC, Fragment } from "react";
import { SigninForm } from "./components/SigninForm";
import { isValideScope } from "./utils/scope";
import { AiFillInfoCircle } from "react-icons/ai";
import { useOnClient } from "../../hooks/on-client";
import { Card } from "../../components/Card";
import { ThemeToggler } from "../../components/ThemeToggler";
interface SigninPageProps {
  query: Query;
  app: Application | null;
  onSigninComplete?: (access: string, u: PublicUserData) => void;
}

const SigninPage: FC<SigninPageProps> = ({ app, query }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const client = useOnClient();

  if (!client) return null;

  if (
    app === null ||
    !query.scope ||
    !isValideScope(query.scope as string) ||
    !query.redirect_uri ||
    !query.client_id ||
    !query.response_type
  ) {
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
        <Box>
          <Container maxW={500} minH="100vh">
            <Center h="100vh">
              <VStack gap={5} textAlign="center">
                <Box px="20px" py="6px" rounded={8}>
                  <Heading size="md">Invalid sign in URL</Heading>
                </Box>
                <Text fontSize={14}>
                  We cannot validate your sign in request.
                </Text>
                <Box
                  maxW={400}
                  textAlign="start"
                  rounded={10}
                  my="30px !important"
                  position="relative"
                >
                  <Card>
                    <Box position="absolute" top="15px" right="15px">
                      <AiFillInfoCircle size="26px" />
                    </Box>
                    <Heading size="sm" mb={3}>
                      What should I do next?
                    </Heading>
                    <Divider my={4} />
                    <Text fontSize={12} mb={3}>
                      If you are the developers of this app, the sign in URL is
                      invalid. Check your source code or contact our admins.
                    </Text>
                    <Text fontSize={12} mb={3}>
                      If you are an app user, the app that you are using is
                      working wrong.
                    </Text>
                  </Card>
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
        <Box>
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
                  <Heading size="sm" mb={3}>
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
    <>
      <Box position="fixed" top="22px" right="22px">
        <ThemeToggler />
      </Box>
      <SigninForm
        app={app}
        query={{
          ...query,
          scope: query.scope as string,
          client_id: query.client_id as string,
          redirect_uri: query.redirect_uri as string,
          response_type: query.response_type as string,
        }}
      />
    </>
  );
};
export default SigninPage;
