import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
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
import logo from "../../../public/full-katrade-accounts-logo.svg";
import ogImage from "../../../public/og-image.png";
interface SigninPageProps {
  query: Query;
  app: Application | null;
}

const SigninPage: FC<SigninPageProps> = ({ app, query }) => {
  const router = useRouter();
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
      router.push(data.payload.url);
    } catch (error) {
      setIsSigninLoading(false);
      alert(error);
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
          <meta name="author" content="Katrade Accounts" />
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
                <Button>ช่วยเหลือ / Help</Button>
                <Button colorScheme="katrade">แจ้งปัญหากับ Katrade</Button>
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
            border="1px solid"
            borderColor="gray.100"
            rounded={8}
            minH="60vh"
            h="auto"
            px="30px"
            py="40px"
            direction="column"
            alignItems="center"
            gap="20px"
            justifyContent="space-between !important"
          >
            <Image alt="z" src={logo.src} h="24px"></Image>
            <Heading fontWeight={500} fontSize="26px">
              เข้าสู่ระบบด้วย KU
            </Heading>
            <Center mt="30px">
              <Flex
                border="1px solid"
                borderColor="gray.200"
                py="5px"
                ps="5px"
                pe="16px"
                fontSize="14px"
                fontWeight={600}
                rounded="full"
                color="gray.600"
                alignItems="center"
                gap={2}
              >
                <Avatar name={app.appName} size="sm"></Avatar>
                {app.appName}
              </Flex>
            </Center>
            <VStack mt="30px" spacing={4} w="full">
              <PrimaryInput
                placeholder="รหัสนิสิต เช่น b621050XXXX"
                onChange={handleUsernameChange}
                value={username}
              />
              <PrimaryInput
                placeholder="รหัสผ่าน"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </VStack>
            <Box
              bg="green.50"
              px="30px"
              py="12px"
              rounded={8}
              w="full"
              border="1px solid"
              borderColor="green.100"
            >
              <Heading fontWeight={500} fontSize="14px" color="gray.600">
                อนุญาติให้{" "}
                <Box as="span" color="green.500">
                  {app.appName}
                </Box>{" "}
                เข้าถึง
              </Heading>
              <Divider my="10px" />
              <UnorderedList fontSize="12px" fontWeight={400} color="gray.500">
                <ListItem>ชื่อ-นามสกุล</ListItem>
                <ListItem>รหัสนิสิต</ListItem>
                <ListItem>การศึกษา</ListItem>
              </UnorderedList>
            </Box>
            <Button
              mt="5px"
              h="70px"
              w="full"
              colorScheme="katrade"
              fontSize="1rem"
              fontWeight={700}
              rounded={8}
              isLoading={isSigninButtonLoading}
              _hover={{
                boxShadow: "0 0 10px #00000030",
              }}
              type="submit"
            >
              เข้าสู่ระบบ
            </Button>
          </Flex>
        </form>
      </Container>
      {/* <Footer /> */}
    </Fragment>
  );
};
export default SigninPage;
