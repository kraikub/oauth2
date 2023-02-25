import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface CardProps {
  children?: any;
  props?: any;
}

const defaultPadding = 4;
const defaultBorderRadius = 8;
export const SimpleCard: FC<CardProps> = (props) => {
  return (
    <Box
      bg={"transparent"}
      p={defaultPadding}
      rounded={defaultBorderRadius}
      borderStyle={"solid"}
      borderWidth={"1px"}
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
      {...props.props}
    >
      {props.children}
    </Box>
  );
};

