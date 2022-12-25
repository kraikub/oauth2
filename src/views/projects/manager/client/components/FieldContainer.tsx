import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

interface FieldContainerProps {
  children?: any;
  title: string;
}

export const FieldContainer: FC<FieldContainerProps> = ({
  title,
  children,
}) => {
  return (
    <Box mb={6}>
      <Heading size="sm" mb={1}>{ title }</Heading>
      { children }
    </Box>
  );
};
