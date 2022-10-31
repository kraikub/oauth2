import {
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react"
import { FC } from "react";
import logo from "../../public/logo-min.png";

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
      border="solid #00000020"
      borderWidth="0 0 1px 0"
      px="20px"
      minH="70px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" gap={3}>
        <Heading size="md" fontWeight={600} color="black" letterSpacing={-1}>
          kraikub.
        </Heading>
      </Flex>
    </Flex>
  );
};
export default StaticNavbar;
