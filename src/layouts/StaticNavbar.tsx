import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

const StaticNavbar: FC = () => {
  return (
    <Flex
      position="sticky"
      top={0}
      left={0}
      right={0}
      py="12px"
      bg="white"
      zIndex={35}
      boxShadow="0 10px 10px #00000010"
      px="20px"
      minH="70px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading size="md" fontWeight={700} color="black">
        kraikub{" "}
      </Heading>
    </Flex>
  );
};
export default StaticNavbar;
