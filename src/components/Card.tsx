import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface CardProps {
  children?: any;
  props?: any;
}

export const Card: FC<CardProps> = (props) => {
  return (
    <Box
      bg={useColorModeValue("whiteAlpha.800", "whiteAlpha.100")}
      p={6}
      rounded={8}
      borderStyle="solid"
      borderWidth="1px"
      borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.50")}
      boxShadow={`0 3px 8px #0000001a`}
      {...props.props}
    >
      {props.children}
    </Box>
  );
};
