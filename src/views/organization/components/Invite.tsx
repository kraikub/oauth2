import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { builtInRoles } from "../../../../api/config/org";
import { testOrgUsername } from "../../../../api/utils/string";
import { Card } from "../../../components/Card";
import { NotificationToast } from "../../../components/NotificationToast";
import { RoleSelector } from "../../../components/org/RoleSelector";
import { orgService } from "../../../services/organizationService";
import { userService } from "../../../services/userService";

interface InviteProps {
  orgId: string;
  myRole: MemberData;
}

export const Invite: FC<InviteProps> = ({ orgId, myRole }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [username, setUsername] = useState("");
  const [nextButtonLoading, setNextButtonLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>();
  const [inviteButtonLoading, setInviteButtonLoading] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<SafeUser | null>();
  const toast = useToast();

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleFindUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    setNextButtonLoading(true);
    const { data } = await userService.safeUserFromUsername(username);
    setSelectedUser(data.payload.user);
    setNextButtonLoading(false);
  };

  const handleInvite = async (e: SyntheticEvent) => {
    e.preventDefault();
    setInviteButtonLoading(true);
    const selectedRole = builtInRoles[role];
    if (!selectedRole || !selectedUser) {
      return alert("Require role or user");
    }
    try {
      await orgService.invite(
        orgId,
        selectedUser.uid,
        selectedRole.priority,
        position
      );
      toast.closeAll();
      toast({
        position: "top",
        render: () => (
          <NotificationToast
            title="Invite sent"
            detail={`Sucessfully invite ${selectedUser.fullName}`}
          />
        ),
      });
      setInviteButtonLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErr((error.response?.data as CustomApiResponse<any>).message);
        }
      } else {
        console.error(error);
        return alert("Failed to create an invitation");
      }
      setInviteButtonLoading(false);
    }
  };

  const titleStyle = {
    mb: 1,
    fontSize: 12,
    fontWeight: 600,
  };

  useEffect(() => {
    if (selectedUser) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [selectedUser]);

  return (
    <>
      <VStack mt={6} spacing={2} alignItems="start">
        <form onSubmit={handleFindUser}>
          <HStack spacing={3} w="full" alignItems="end">
            <Box>
              <Text {...titleStyle}>Invite member</Text>
              <HStack
                position="relative"
                borderRadius="md"
                borderWidth="1px"
                transition="300me ease"
                boxShadow={selectedUser === null ? "0 0 0 2px crimson" : "none"}
              >
                <Center
                  minH="36px"
                  minW="36px"
                  borderWidth="0 1px 0 0"
                  fontWeight={700}
                >
                  @
                </Center>
                <Input
                  rounded={6}
                  variant="unstyled"
                  placeholder="username"
                  value={username}
                  isRequired
                  onChange={(e) => setUsername(e.target.value)}
                  w="full"
                  maxW="400px"
                  h="36px"
                  isInvalid={selectedUser === null}
                />
              </HStack>
            </Box>
            <Button
              colorScheme="kraikub.blue.always"
              color="white"
              type="submit"
              isLoading={nextButtonLoading}
              h="36px"
            >
              Next
            </Button>
          </HStack>
          {err ? <Text>{err}</Text> : null}
        </form>
      </VStack>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleInvite}>
            <ModalHeader>Add your new crew!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack>
                <Avatar
                  name={selectedUser?.fullName}
                  src={selectedUser?.profileImageUrl}
                />
                <Heading size="sm">{selectedUser?.fullName}</Heading>
              </HStack>
              <Box>
                <Text {...titleStyle} mt={8}>
                  Permission
                </Text>
                <RoleSelector
                  role={role}
                  setRole={setRole}
                  showRolesUnder={myRole.priority}
                />
              </Box>
              <Text {...titleStyle} mt={8}>
                What they do? Give them a position.
              </Text>
              <Input
                placeholder="Ex. Head of Marketing"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <Text opacity={0.8} mt={8}>
                We will send the invitation via email. Have a nice journey with
                your new crew!
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                size="lg"
                w={["full"]}
                colorScheme="kraikub.blue.always"
                color="white"
                mr={3}
                isLoading={inviteButtonLoading}
                isDisabled={!position || !role}
                onClick={handleClose}
                type="submit"
              >
                Invite
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
