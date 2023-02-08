import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { builtInRoles } from "../../../../api/config/org";
import { NotificationToast } from "../../../components/NotificationToast";
import { RoleSelector } from "../../../components/org/RoleSelector";
import { useClientTranslation } from "../../../hooks/client-translation";
import { orgService } from "../../../services/organizationService";
import { roleSelectorDict, userOrgCardDict } from "../../../translate/org";

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
  const { t } = useClientTranslation(userOrgCardDict);
  const { t: roltT } = useClientTranslation(roleSelectorDict);
  const [prevRole, setPrevRole] = useState(member.roleType);
  const [role, setRole] = useState(member.roleType);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [transactionType, setTransactionType] = useState("");

  const clearTransactionType = () => {
    setTransactionType("");
  };

  const handleClose = () => {
    setIsOpen(false);
    clearTransactionType();
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await orgService.removeMember(orgId, member.user.uid);
      router.reload();
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        console.error((error.response.data as CustomApiResponse).message);
      }
    }
  };

  const handleLeave = async () => {
    setLoading(true);
    try {
      await orgService.leave();
      location.reload();
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        console.error((error.response.data as CustomApiResponse).message);
      }
    }
  };

  const handleTransferOwnership = async () => {
    setLoading(true);
    try {
      await orgService.transferOwnership(orgId, member.user.uid);
      location.reload();
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        console.error((error.response.data as CustomApiResponse).message);
      }
    }
  };

  const onConfirmFunction = () => {
    switch (transactionType) {
      case "transferOwnership": {
        return handleTransferOwnership;
      }
      case "remove": {
        return handleRemove;
      }
      case "leave": {
        return handleLeave;
      }
      default: {
        return () => {
          alert("Unknown transaction type.");
        };
      }
    }
  };

  const confirmationButton = () => {
    switch (transactionType) {
      case "transferOwnership": {
        return t("Transfer");
      }
      case "remove": {
        return t("Remove");
      }
      case "leave": {
        return t("Leave");
      }
      default: {
        return "";
      }
    }
  };

  const actionDescribeFunction = () => {
    switch (transactionType) {
      case "transferOwnership": {
        return `${member.user.fullName} ${t(
          "confirmation-transfer-ownership"
        )}`;
      }
      case "remove": {
        return `${member.user.fullName} ${t("confirmation-remove")}`;
      }
      case "leave": {
        return t("confirmation-leave");
      }
      default: {
        return "Unknown transaction type";
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
            title={t("Role updated")}
            detail={`${t("Successfully changed")} ${member.user.fullName} ${t(
              "to"
            )} ${roltT(newRole.roleName)}${t("change-notification-suffix")}`}
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
            <HStack spacing={2}>
              <Text fontWeight={600} textTransform="uppercase">
                {member.user.fullName}
              </Text>
              {me ? <Badge colorScheme="purple">{t("me")}</Badge> : null}
              {member.priority === 0 ? (
                <Badge
                  colorScheme="blue"
                  h="24px"
                  w="24px"
                  p={0}
                  rounded={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaCrown size="16px" />
                </Badge>
              ) : null}
            </HStack>
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
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        closeOnOverlayClick={!transactionType ? true : false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Collapse in={!transactionType ? true : false}>
              <VStack spacing={3} mt={8}>
                <VStack spacing={6} w="full">
                  <Avatar src={member.user.profileImageUrl} size="2xl"></Avatar>
                  <VStack spacing={2}>
                    <Heading size="lg">{member.user.fullName}</Heading>
                    <Text opacity={0.7} fontSize={18}>
                      {member.data.displayPosition}
                    </Text>

                    <Text opacity={0.7} fontSize={18}>
                      {member.user.username}
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
                {myRole.priority === 0 && !me ? (
                  <Button
                    h="58px"
                    size="lg"
                    onClick={() => setTransactionType("transferOwnership")}
                    w="full"
                    rounded={12}
                  >
                    {t("Transfer Ownership")}
                  </Button>
                ) : null}
                {(myRole.priority <= 2 && myRole.priority < member.priority) ||
                (me && member.priority !== 0) ? (
                  <Button
                    colorScheme="kraikub.red.always"
                    color="white"
                    h="58px"
                    size="lg"
                    onClick={() => setTransactionType(me ? "leave" : "remove")}
                    w="full"
                    rounded={12}
                  >
                    {me ? t("Leave") : t("Remove")}
                  </Button>
                ) : null}
              </VStack>
            </Collapse>
            <Collapse in={transactionType ? true : false}>
              <Confirmation
                loading={loading}
                header={t("Are your sure?")}
                onConfirm={onConfirmFunction()}
                onCancel={clearTransactionType}
                actionButtonText={confirmationButton()}
                actionDescribe={actionDescribeFunction()}
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
  header: string;
  loading: boolean;
}

export const Confirmation: FC<ConfirmationProps> = ({
  onCancel,
  onConfirm,
  actionDescribe,
  actionButtonText,
  header,
  loading,
}) => {
  const buttonProps = {
    size: "lg",
    h: "50px",
  };
  return (
    <Box pt={6}>
      <Heading size="md">{header}</Heading>
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
          isLoading={loading}
        >
          {actionButtonText}
        </Button>
      </SimpleGrid>
    </Box>
  );
};
