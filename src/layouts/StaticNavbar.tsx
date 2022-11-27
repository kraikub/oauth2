import { Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

interface NavbarOptions {
  sticky?: boolean;
  color?: string;
  bgColor?: string;
}

const StaticNavbar: FC<NavbarOptions> = (props) => {
  return (
    <Flex
      position={props.sticky ? "sticky" : "relative"}
      color={props.color || "black"}
      top={0}
      left={0}
      right={0}
      py="12px"
      bgColor={props.bgColor || "white"}
      zIndex={35}
      px="20px"
      minH="70px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" gap={3}>
        <Heading size="sm" fontWeight={700}>
          KRAIKUB{" "}
          <Text as="span" fontWeight={300} opacity={0.8}>
            DEVELOPERS
          </Text>
        </Heading>
      </Flex>
    </Flex>
  );
};
export default StaticNavbar;
