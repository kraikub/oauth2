import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { BsGithub, BsInstagram } from "react-icons/bs";

const Footer: FC = () => {
  return (
    <Box
      bottom={0}
      left={0}
      right={0}
      py="50px"
      bg="white"
      zIndex={35}
      boxShadow="0 -5px 5px #00000008"
    >
      <Container size="container.xl" h="full">
        <Center>
          <Text fontWeight={500}>Made with 💚 by my hands.</Text>
        </Center>
        <Center mt={4} gap={3}>
          <Text fontWeight={800} fontSize={12}>
            {" "}
            Nutchanon
          </Text>
          <a href="https://github.com/nutchanonc">
            <BsGithub size="24px" />
          </a>
          <a href="https://instagram.com/beamuuuu">
            <BsInstagram size="24px" />
          </a>
        </Center>
      </Container>
    </Box>
  );
};
export default Footer;
