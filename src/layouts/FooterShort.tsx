import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";

export const FooterShort = () => {
  return (
    <Box bg="#f5f5f7">
      <Container maxW={700}>
        <Box py={6} fontSize={12} color="#00000050">
          <Text fontSize={12} color="#00000090">Kraikub | All of Kasetsart, in one account.</Text>
          <Text fontSize={12}>Senior project under Department of Computer Engineering, Kasetsart University, Bangkok, Thailand.</Text>
          <Text fontSize={12} mt={6}>Copyright © 2022 Nutchanon Chantrasup. All rights reserved.</Text>
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
