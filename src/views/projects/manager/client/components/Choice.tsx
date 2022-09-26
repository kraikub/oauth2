import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface ChoiceProps {
  set: any;
  value: any;
  title: string;
  description: string;
  currentValue: any;
}

export const Choice: FC<ChoiceProps> = ({
  set,
  value,
  title,
  description,
  currentValue,
}) => {
  const color = () => {
    return value === currentValue ? "#009433" : "gray.600";
  };
  return (
    <Box
      p={5}
      border="1px solid"
      borderColor={color()}
      rounded={8}
      maxW="400px"
      cursor="pointer"
      onClick={() => set(value)}
    >
      <Text color={color()} fontWeight={700}>{title}</Text>
      {description ? (
        <Text fontSize={12} color={color()} pt={5}>
          {description}
        </Text>
      ) : null}
    </Box>
  );
};
