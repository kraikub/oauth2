import {
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
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Application } from "../../../db/schema/application";
import Footer from "../../layouts/Footer";
import { PrimaryInput } from "./PrimaryInput";

interface SinginPageProps {
  app: Application | null;
}

const SigninPage: FC<SinginPageProps> = ({ app }) => {
  if (app == null) {
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
            <Box
              border="1px solid"
              borderColor="gray.400"
              py="8px"
              px="20px"
              rounded="full"
              fontSize="16px"
              color="gray.600"
            >
              {app.appName}
            </Box>
          </Center>
          <VStack mt="30px" spacing={4} w="full">
            <PrimaryInput placeholder="รหัสนิสิต เช่น b621050XXXX" />
            <PrimaryInput placeholder="รหัสผ่าน" type="password" />
          </VStack>
          <Box bg="gray.50" px="30px" py="12px" rounded={6} w="full">
            <Heading fontWeight={400} fontSize="14px" color="gray.600">
              อนุญาติให้ {app.appName} เข้าถึง
            </Heading>
            <Divider my="10px"/>
            <UnorderedList fontSize="12px" fontWeight={400} color="gray.500">
              <ListItem>ชื่อ-นามสกุล</ListItem>
              <ListItem>รหัสนิสิต</ListItem>
              <ListItem>คณะที่ศึกษา</ListItem>
              <ListItem>ชื่อขนามสกุล</ListItem>
            </UnorderedList>
          </Box>
          <Button
            mt="60px"
            h="70px"
            w="full"
            bg="linear-gradient(149deg, rgba(32,222,0,1) 0%, rgba(0,255,224,1) 100%);"
            color="white"
            _hover={{ bg: undefined }}
            _active={{ bg: undefined }}
            fontSize="1.2rem"
            fontWeight={500}
            rounded={16}
          >
            เข้าสู่ระบบ
          </Button>
        </Flex>
      </Container>
      {/* <Footer /> */}
    </>
  );
};
export default SigninPage;
