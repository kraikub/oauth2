import { Badge } from "@chakra-ui/react";
import { FC } from "react";

interface ScopeBadgeProps {
  children?: any;
}

export const ScopeBadge: FC<ScopeBadgeProps> = ({ children }) => {
  return (
    <Badge
      bg="katrade.main"
      size="lg"
      color="white"
      display="flex"
      alignItems="center"
      gap={2}
      px={2}
      py={1}
      textTransform="none"
      rounded="full"
    >
      {children}
    </Badge>
  );
};
