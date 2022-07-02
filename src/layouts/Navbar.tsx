import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      minH="70px"
      bg="white"
      zIndex={35}
      border="solid #00000010"
      borderWidth="0 0 1px 0"
      px="20px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image
        src="https://github.com/katrade/resources/blob/main/mainlogo-dark.png?raw=true"
        h="30px"
      ></Image>
    </Flex>
  );
};
export default Navbar;
