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
import { BsArrowUpRight } from "react-icons/bs";
import { FooterShort } from "../src/layouts/FooterShort";
import StaticNavbar from "../src/layouts/StaticNavbar";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Kraikub - Authenticate any KU students.</title>
      </Head>
      <Box bg="linear-gradient(121deg, rgba(0,111,79,1) 0%, rgba(0,74,106,1) 100%)">
        <StaticNavbar color="white" bgColor="transparent" />
        <Box minH="100vh">
          <Container
            maxW="container.xl"
            minH="80vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="white"
          >
            <Box w="full" maxW={1400} p={6} rounded={10} textAlign="center">
              <Heading fontSize={50} letterSpacing="-2px" fontWeight={500}>
                <Box as="span" fontWeight={700}>
                  KRAIKUB
                </Box>{" "}
                Developer Console
              </Heading>
              <VStack alignItems="center" my={6}>
                <Text fontSize={18}>
                  Integrate any applications with our Kasetsart University
                  Authentication Service.
                </Text>
              </VStack>
              <Flex justifyContent="center" gap={2} mt="60px">
                <Button
                  size="lg"
                  height="60px"
                  bg="#ffffff40"
                  _hover={{
                    bg: "#ffffff80",
                  }}
                  onClick={() => router.push("/projects/manager")}
                  gap={2}
                >
                  Try now for free <BsArrowUpRight />
                </Button>
              </Flex>
            </Box>
          </Container>
        </Box>
      </Box>
      <FooterShort contentSize="container.xl" />
    </>
  );
};

export default Home;
