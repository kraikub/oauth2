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
  Input,
  ListItem,
  SliderTrack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Application } from "../../../db/schema/application";
import { authService } from "../../services/authService";
import { Query } from "../../types/query";
import { PrimaryInput } from "./PrimaryInput";

interface SinginPageProps {
  query: Query;
  app: Application | null;
}

const SigninPage: FC<SinginPageProps> = ({ app, query }) => {
  console.log(query);
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
        query.ref as string
      );
      router.push(
        `${app.redirectUrl}?client_id=${app.clientId}&token=${
          data.payload.accessToken
        }${query.ref ? `ref=${query.ref}` : ""}`
      );
    } catch (error) {
      setIsSigninLoading(false);
      alert(error);
    }
  };

  if (app === null || query.scope === null) {
    return (
      <Container maxW={500} minH="100vh">
        <Center h="100vh">
          <VStack spacing={3} textAlign="center">
            <Heading fontWeight={500}>🤔</Heading>
            <Heading size="md" fontWeight={500}>
              เกิดข้อผิดพลาดขึ้น
            </Heading>
            <Text>ดูเหมือนว่าเราไม่สามารถดำเนินการลิงค์ของคุณได้</Text>
            <Text color="gray.500">
              คุณควรที่จะตรวจสอบความถูกต้องของลิงค์ของคุณหรือติดต่อผู้พัฒนาแอปพลิเคชั่นที่เกี่ยวข้องกับคุณ
            </Text>
            <HStack mt="50px !important">
              <Button size="sm" color="gray.400" fontWeight={400}>
                ช่วยเหลือ
              </Button>
              <Button
                size="sm"
                fontWeight={400}
                color="white"
                bg="#00de73"
                _hover={{ bg: undefined }}
                _active={{ bg: undefined }}
              >
                แจ้งปัญหากับ Katrade
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Container maxW={500} minH="100vh" py="4%">
        <form onSubmit={handleSigninEvent}>
          <Flex
            boxShadow="0 0 20px #00000010"
            rounded={22}
            minH="60vh"
            h="auto"
            px="30px"
            py="40px"
            direction="column"
            alignItems="center"
            gap="20px"
            justifyContent="space-between !important"
          >
            <Image
              alt="z"
              src="https://github.com/katrade/resources/blob/main/mainlogo-green.png?raw=true"
              h="20px"
            ></Image>
            <Heading fontWeight={500} fontSize="26px">
              เข้าสู่ระบบด้วย KU
            </Heading>
            <Center mt="30px">
              <Flex
                border="1px solid"
                borderColor="gray.200"
                py="5px"
                px="20px"
                rounded="full"
                fontSize="16px"
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
              rounded={16}
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
              mt="60px"
              h="70px"
              w="full"
              bg="linear-gradient(149deg, rgba(32,222,0,1) 0%, rgba(0,255,224,1) 100%);"
              color="white"
              _active={{ bg: undefined }}
              fontSize="1.2rem"
              fontWeight={500}
              rounded={16}
              isLoading={isSigninButtonLoading}
              _hover={{
                bg: undefined,
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
    </>
  );
};
export default SigninPage;
