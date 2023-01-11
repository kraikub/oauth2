import { Input, InputProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

export const CustomInput: FC<InputProps> = (props) => {
  return (
    <Input
      variant="outline"
      borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.500")}
      fontWeight={500}
      _placeholder={{
        color: useColorModeValue("blackAlpha.600", "whiteAlpha.700"),
      }}
      size="md"
      rounded={4}
      {...props}
    />
  );
};
