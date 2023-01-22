import { Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { LinkWrap } from "../components/LinkWrap";
import { SmartLanguageToggler } from "../components/SmartLanguageToggler";
import { ThemeToggler } from "../components/ThemeToggler";

interface NavbarOptions {
  hideLanguageSelector?: boolean;
}

const StaticNavbar: FC<NavbarOptions> = (props) => {
  return (
    <Container maxW="container.xl">
      <Flex
        py="12px"
        zIndex={35}
        minH="70px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap={3}>
          <LinkWrap href="/">
            <Heading size="sm" fontWeight={700}>
              KRAIKUB{" "}
            </Heading>
          </LinkWrap>
        </Flex>
        <HStack spacing={3}>
          <ThemeToggler />
          {props.hideLanguageSelector ? null : (
            <SmartLanguageToggler sx={{ size: "sm" }} />
          )}
        </HStack>
      </Flex>
    </Container>
  );
};
export default StaticNavbar;
