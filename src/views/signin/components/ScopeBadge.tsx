import { Badge } from "@chakra-ui/react";
import { FC } from "react";

interface ScopeBadgeProps {
  children?: any;
}

export const ScopeBadge: FC<ScopeBadgeProps> = ({ children }) => {
  return (
    <Badge
      bg="gray.300"
      size="lg"
      color="black"
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
