import { Box } from "@chakra-ui/react";
import { FC } from "react";
import Navbar from "./Navbar";

interface AppLayoutProps {
  children?: any;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box mt="130px">
      <Navbar />
      {children}
    </Box>
  );
};
