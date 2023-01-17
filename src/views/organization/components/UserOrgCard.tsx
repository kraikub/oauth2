import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";

interface UserCardProps {
  m: MemberData;
  editable: boolean;
  me?: boolean
}

export const UserOrgCard: FC<UserCardProps> = ({ m, editable }) => {
  return (
    <HStack w="full" px={5} py={3} justifyContent="space-between">
      <HStack spacing={4}>
        <Avatar src={m.user.profileImageUrl} />
        <Box>
          <Text fontWeight={600}>{m.user.fullName}</Text>
          <Text opacity={0.6}>{m.data.displayPosition}</Text>
        </Box>
      </HStack>
      {editable ? (
        <ButtonGroup>
          <Button size="sm">Remove</Button>
        </ButtonGroup>
      ) : null}
    </HStack>
  );
};
