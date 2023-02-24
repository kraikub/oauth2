import { Divider, DividerProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface CustomDividerProps {
  sx?: DividerProps;
}

export const CustomDivider: FC<CustomDividerProps> = ({ sx }) => {
  return (
    <Divider
      my={4}
      opacity={1}
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
      {...sx}
    />
  );
};
