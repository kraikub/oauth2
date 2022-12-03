import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { BsArrowUpRight } from "react-icons/bs";

export const OAuthSuggestion: FC = () => {
  return (
    <SimpleGrid columns={[1, 1, 2]} spacing={2} my="90px">
      <Box>
        <Heading>Explore more about OAuth 2.0 Protocol</Heading>
        <Text my={4}>
          Visit the official website of{" "}
          <Link href="https://oauth.net/2/" color="kraikub.blue.400">
            oauth.net
          </Link>{" "}
          and dive in to OAuth2 standards and explanation
        </Text>
        <Link href="https://oauth.net/2/" _hover={{ textDecoration: "none" }}>
          <Button my={4} size="lg" gap={2}>
            Explore now <BsArrowUpRight />
          </Button>
        </Link>
      </Box>
      <Flex
        justifyContent="center"
        alignItems="space-between"
        bgColor="#1c223d"
        h="400px"
        rounded={20}
      >
        <img src="/Oauth_logo.svg" width="300px"></img>
      </Flex>
    </SimpleGrid>
  );
};
