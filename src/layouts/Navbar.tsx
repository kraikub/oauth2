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
import logo from "../../public/full-katrade-accounts-logo.svg";

const Navbar: FC = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      py="12px"
      bg="white"
      zIndex={35}
      border="solid #00000010"
      borderWidth="0 0 1px 0"
      px="20px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image src={logo.src} alt="logo" h="26px"></Image>
    </Flex>
  );
};
export default Navbar;
