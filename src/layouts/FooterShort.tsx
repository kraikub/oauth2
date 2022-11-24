import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";
import { FC } from "react";

interface FooterShortProps {
  contentSize?: string; 
}

export const FooterShort: FC<FooterShortProps> = (props) => {
  return (
    <Box bg="gray.50">
      <Container maxW={props.contentSize || "container.sm"}>
        <Box py={6} fontSize={12} color="#00000090">
          <Text fontSize={12} fontWeight={500} color="#000000">KRAIKUB | All of Kasetsart, in one account.</Text>
          <Text fontSize={12}>Senior project under Department of Computer Engineering, Kasetsart University, Bangkok, Thailand.</Text>
          <Text fontSize={12} mt={6} color="#000000">Copyright © 2022 Nutchanon Chantrasup. All rights reserved.</Text>
          <Flex alignItems="center" justifyContent="space-between" mt={2} flexWrap="wrap">
            <Link color="#00000080">Contact us</Link>
            <Link color="#00000080">About us</Link>
            <Link color="#00000080">Privacy</Link>
            <Link color="#00000080">Support</Link>
            <Link color="#00000080" href="https://kraikub.com">
              kraikub.com
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
