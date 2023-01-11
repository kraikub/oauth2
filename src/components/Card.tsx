import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface CardProps {
  children?: any;
  props?: any;
}

export const Card: FC<CardProps> = (props) => {
  return (
    <Box
      // bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
      p={6}
      rounded={10}
      borderStyle="solid"
      borderWidth="1px"
      borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.200")}
      // boxShadow={`0 3px 8px #0000001a`}
      {...props.props}
    >
      {props.children}
    </Box>
  );
};
