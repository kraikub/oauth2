import { Box, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Box w="100vw">
      <Flex
        h="100vh"
        width="full"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={5}
      >
        <Heading size="sm">404 | Page not found</Heading>
      </Flex>
    </Box>
  );
};
export default NotFound;
