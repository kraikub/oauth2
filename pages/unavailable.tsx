import { Box, Button, Flex, Heading, IconButton, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BsQuestion } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

const Unavailable: NextPage = () => {
  const router = useRouter();
  return (
    <Box w="100vw">
      <Box position="fixed" bottom="20px" right="20px">
        <IconButton aria-label="why-i-see-this" rounded="full">
          <BsQuestion size="24px"/>
        </IconButton>
      </Box>
      <Flex
        h="100vh"
        width="full"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={5}
      >
        <Box bg="gray.100" h="fit-content" px={4} rounded={8} py={3}>
          <Heading size="md">This page is unavailable.</Heading>
        </Box>
        <Box>
          <Button variant="link" colorScheme="messenger" onClick={() => router.back()} gap={1} size="sm">
            <IoIosArrowBack /> Back
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
export default Unavailable;
