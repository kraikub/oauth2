import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Collapse,
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
  SimpleGrid,
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
import { PageWrapper } from "../../kraikub-id/components/PageWrapper";

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
  const [isConfirmation, setIsConfirmation] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    setIsConfirmation(false);
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
      <Modal isOpen={isOpen} onClose={handleClose} closeOnOverlayClick={!isConfirmation}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Collapse in={!isConfirmation}>
              <VStack spacing={3} mt={8}>
                <VStack spacing={6} w="full">
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
                {(member.priority &&
                  myRole.priority <= 2 &&
                  myRole.priority < member.priority) ||
                me ? (
                  <Button
                    colorScheme="kraikub.red.always"
                    color="white"
                    h="58px"
                    size="lg"
                    onClick={() => setIsConfirmation(true)}
                    w="full"
                    rounded={12}
                  >
                    {me ? "Leave" : "Remove"}
                  </Button>
                ) : null}
              </VStack>
            </Collapse>
            <Collapse in={isConfirmation}>
              <Confirmation
                onConfirm={me ? handleLeave : handleRemove}
                onCancel={() => setIsConfirmation(false)}
                actionButtonText={me ? "Leave" : "Remove"}
                actionDescribe={
                  me
                    ? `You are going to leave this organization.` +
                      " " +
                      "This operation cannot be undone. Would you like to proceed?"
                    : "You are going to remove" +
                      " " +
                      member.user.fullName +
                      " " +
                      "from this organization." +
                      " " +
                      "This operation cannot be undone. Would you like to proceed?"
                }
                member={member}
              />
            </Collapse>
          </ModalBody>

          <ModalFooter py={2}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface ConfirmationProps {
  onConfirm: (() => Promise<void>) | (() => void);
  onCancel: (() => Promise<void>) | (() => void);
  actionDescribe: string;
  actionButtonText: string;
  member: MemberData;
}

export const Confirmation: FC<ConfirmationProps> = ({
  onCancel,
  onConfirm,
  member,
  actionDescribe,
  actionButtonText,
}) => {
  const buttonProps = {
    size: "lg",
    h: "50px",
  };
  return (
    <Box pt={6}>
      <Heading size="md">Are your sure?</Heading>
      <Text fontWeight={500} mt={2} opacity={0.7}>
        {actionDescribe}
      </Text>
      <SimpleGrid columns={2} gap={2} mt="40px">
        <Button {...buttonProps} onClick={onCancel}>
          Back
        </Button>
        <Button
          {...buttonProps}
          colorScheme="kraikub.red.always"
          color="white"
          onClick={onConfirm}
        >
          {actionButtonText}
        </Button>
      </SimpleGrid>
    </Box>
  );
};
