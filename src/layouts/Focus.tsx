import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface FocusProps {
  children?: any;
}

export const Focus: FC<FocusProps> = ({ children }) => {
  return (
    <Box as="span" color="katrade.main" fontWeight={700}>
      {children}
    </Box>
  );
};
