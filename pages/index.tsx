import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import StaticNavbar from "../src/layouts/StaticNavbar";

const Home: NextPage = () => {
  const router = useRouter();
  const outlineButtonStyles = {
    bg: "transparent",
    color: "gray.500",
    border: "1px solid",
    borderColor: "#0000001e",
    _hover: {
      bg: undefined,
    },
  };
  return (
    <>
      <Head>
        <title>Kraikub - Authenticate any KU students.</title>
      </Head>
      <StaticNavbar />
      <Box>
        <Container
          maxW="container.lg"
          minH="80vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="full" maxW="600px" p={6} rounded={10}>
            <Heading size="lg" letterSpacing="-1px">Developer Console</Heading>
            <VStack alignItems="start" my={6}>
              <Text fontSize={18} color="gray.600">
                สร้างเว็บแอปพลิเคชั่นเกี่ยวกับ KU ได้เร็วยิ่งขึ้น
                ด้วยระบบยืนยันตัวตน นิสิต/นักศึกษา มหาวิทยาลัยเกษตรศาสตร์ และ
                API เกี่ยวกับข้อมูลของผู้ใช้งาน และฟีเจอร์ความปลอดภัยของข้อมูล
              </Text>
            </VStack>
            <Flex justifyContent="start" gap={2} mt="60px">
              <a href="https://www.kraikub.com">
                <Button {...outlineButtonStyles} size="lg">
                  เรียนรู้เพิ่มเติม
                </Button>
              </a>
              <Button
                size="lg"
                colorScheme="katrade"
                onClick={() => router.push("/projects/manager")}
              >
                เริ่มต้นเลย (ฟรี)
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
