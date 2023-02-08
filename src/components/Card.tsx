import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface CardProps {
  children?: any;
  props?: any;
  disableMobileBorder?: boolean;
}

const defaultPadding = 4;
const defaultBorderRadius = 8;
export const Card: FC<CardProps> = (props) => {
  return (
    <Box
      bg={useColorModeValue("card.light", "card.dark")}
      p={defaultPadding}
      rounded={
        props.disableMobileBorder
          ? defaultBorderRadius
          : [0, defaultBorderRadius]
      }
      borderStyle={props.disableMobileBorder ? "none" : ["solid", "none"]}
      borderWidth="1px 0 1px 0"
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
      boxShadow={["none", `0 2px 30px #00000016`]}
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
