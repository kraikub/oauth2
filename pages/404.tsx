import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const NotFound: NextPage = () => {
  const router = useRouter()
  return (
    <Box w="100vw">
      <Flex h="100vh" bg="gray.200" width="full" justifyContent="center" alignItems="center" direction="column" gap={5}>
        <Box bg="gray.300" h="fit-content" px={4} rounded={8} py={3}>
          <Heading size="md">Oops! 404 | Page not found.</Heading>
        </Box>
      </Flex>
    </Box>
  );
};
export default NotFound;
