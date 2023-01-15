import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface CardProps {
  children?: any;
  props?: any;
}

export const Card: FC<CardProps> = (props) => {
  return (
    <Box
      bg={useColorModeValue("card.light", "card.dark")}
      p={6}
      rounded={10}
      // borderStyle="solid"
      // borderWidth="1px"
      // borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.200")}
      boxShadow={`0 2px 2px #0000001a`}
      {...props.props}
    >
      {props.children}
    </Box>
  );
};
