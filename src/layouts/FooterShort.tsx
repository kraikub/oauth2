import { Box, Container, Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface FooterShortProps {
  contentSize?: string; 
}

export const FooterShort: FC<FooterShortProps> = (props) => {
  return (
    <Box bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}>
      <Container maxW={props.contentSize || "container.xl"} minH="200px">
        <Box py={6} fontSize={12}>
          <Text fontSize={12} fontWeight={700}>KRAIKUB | All of Kasetsart, in one account.</Text>
          <Text fontSize={12} fontWeight={600} opacity={0.6}>Senior project under Department of Computer Engineering, Kasetsart University, Bangkok, Thailand.</Text>
          <Text fontSize={12} mt={6} opacity={0.6}>Copyright © 2022 Nutchanon Chantrasup. All rights reserved.</Text>
          <Flex alignItems="center" justifyContent="space-between" mt={2} flexWrap="wrap">
            <Link>Contact us</Link>
            <Link>About us</Link>
            <Link>Privacy</Link>
            <Link>Support</Link>
            <Link href="https://kraikub.com">
              kraikub.com
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
