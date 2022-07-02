import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import Footer from "../../layouts/Footer";
import { PrimaryInput } from "./PrimaryInput";

const SigninPage: FC = () => {
  return (
    <>
      <Container size="container.sm" minH="100vh" py="4%">
        <Flex
          boxShadow="0 0 20px #00000010"
          rounded={12}
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
            src="https://github.com/katrade/resources/blob/main/mainlogo-green.png?raw=true"
            h="30px"
          ></Image>
          <Heading fontWeight={500}>เข้าสู่ระบบด้วย KU</Heading>
          <VStack mt="50px" spacing={4} w="full">
            <PrimaryInput placeholder="รหัสนิสิต เช่น b621050XXXX" />
            <PrimaryInput placeholder="รหัสผ่าน" type="password" />
          </VStack>
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
      <Footer />
    </>
  );
};
export default SigninPage;
