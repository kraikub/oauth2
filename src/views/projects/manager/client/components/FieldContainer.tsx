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
    <Box bg="white" boxShadow="0 2px 5px 2px #00000020" p={6} rounded={18} mb={6}>
      <Heading size="sm" mb={1} color="katrade.main">{ title }</Heading>
      { children }
    </Box>
  );
};
