import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { IoMdMail, IoMdMore } from "react-icons/io";
import { builtInRoles, roleMap } from "../../../../api/config/org";
import { Card } from "../../../components/Card";
import { NotificationToast } from "../../../components/NotificationToast";
import { RoleSelector } from "../../../components/org/RoleSelector";
import { orgService } from "../../../services/organizationService";

interface UserCardProps {
  member: MemberData;
  myRole: MemberData;
  editable: boolean;
  me?: boolean;
  orgId: string;
}

export const UserOrgCard: FC<UserCardProps> = ({
  member,
  editable,
  me,
  orgId,
  myRole,
}) => {
  const router = useRouter();
  const [prevRole, setPrevRole] = useState(member.roleType);
  const [role, setRole] = useState(member.roleType);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toast = useToast();
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleRemove = async () => {
    try {
      await orgService.removeMember(orgId, member.user.uid);
      router.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error((error.response.data as CustomApiResponse).message);
      }
    }
  };

  const handleLeave = async () => {
    try {
      await orgService.leave();
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error((error.response.data as CustomApiResponse).message);
      }
    }
  };

  const handleUpdate = async () => {
    const newRole = builtInRoles[role];
    if (!newRole) {
      return alert("Undefined role");
    }
    try {
      await orgService.updateRole(orgId, member.user.uid, newRole.priority);
      setPrevRole(role);
      toast.closeAll();
      toast({
        position: "top",
        render: () => (
          <NotificationToast
            title="Role updated"
            detail={`Successfully changed ${member.user.fullName} to ${newRole.roleName}.`}
          />
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (prevRole !== role) {
      handleUpdate();
    }
  }, [role]);

  return (
    <>
      <HStack w="full" px={5} py={3} justifyContent="space-between">
        <HStack spacing={4}>
          <Avatar src={member.user.profileImageUrl} />
          <Box>
            <Text fontWeight={600}>{member.user.fullName}</Text>
            <Text opacity={0.6}>{member.data.displayPosition}</Text>
          </Box>
        </HStack>
        <IconButton
          aria-label="user-action"
          fontSize={20}
          variant="ghost"
          rounded="full"
          onClick={handleOpen}
        >
          <IoMdMore />
        </IconButton>
      </HStack>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
              <Avatar src={member.user.profileImageUrl} size="2xl"></Avatar>
              <VStack spacing={2}>
                <Heading size="lg">{member.user.fullName}</Heading>
                <Text opacity={0.7} fontSize={18}>
                  {member.data.displayPosition}
                </Text>

                <Text opacity={0.7} fontSize={18}>
                  {member.user.personalEmail}
                </Text>
              </VStack>
              <Box w="full">
                <RoleSelector
                  showRolesUnder={myRole.priority}
                  role={role}
                  setRole={setRole}
                  disabled={role === "owner" || !editable}
                  menuButtonProps={{
                    w: "full",
                    h: "44px",
                    rounded: 12,
                  }}
                />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter display="block">
            {member.priority ? (
              <Button
                colorScheme="kraikub.red.always"
                color="white"
                size="lg"
                onClick={me ? handleLeave : handleRemove}
                w="full"
                rounded={12}
              >
                {me ? "Leave" : "Remove"}
              </Button>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
