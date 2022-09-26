import { Badge } from "@chakra-ui/react";
import { FC } from "react";

interface ScopeBadgeProps {
  children?: any;
}

export const ScopeBadge: FC<ScopeBadgeProps> = ({ children }) => {
  return (
    <Badge
      size="lg"
      colorScheme="green"
      display="flex"
      alignItems="center"
      gap={2}
      px={2}
      py={1}
      textTransform="none"
      rounded={6}
    >
      {children}
    </Badge>
  );
};
