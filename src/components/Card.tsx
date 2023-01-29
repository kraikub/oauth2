import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface CardProps {
  children?: any;
  props?: any;
  disableMobileBorder?: boolean;
}

const defaultPadding = 4;

export const Card: FC<CardProps> = (props) => {
  return (
    <Box
      bg={useColorModeValue("card.light", "card.dark")}
      p={defaultPadding}
      rounded={[0, 10]}
      borderStyle={props.disableMobileBorder ? "none" : ["solid", "none"]}
      borderWidth="1px 0 1px 0"
      borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.200")}
      boxShadow={["none", `0 2px 10px #0000001a`]}
      {...props.props}
    >
      {props.children}
    </Box>
  );
};

export const CardContent: FC<CardProps> = (props) => {
  return (
    <Box p={defaultPadding} {...props.props}>
      {props.children}
    </Box>
  );
};
