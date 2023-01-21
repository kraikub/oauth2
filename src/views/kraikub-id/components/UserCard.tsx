import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { BsDot } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Card, CardContent } from "../../../components/Card";
import { useClientTranslation } from "../../../hooks/client-translation";
import { userService } from "../../../services/userService";
import { dictUserCard } from "../../../translate/kraikubid";

interface UserCardProps {
  user: UserWithExtra;
}

const cardContentProps = {
  props: {
    px: "20px",
  },
};

const menuButtonProps = {
  w: ["full", "auto"],
};

export const UserCard: FC<UserCardProps> = ({ user }) => {
  const { t } = useClientTranslation(dictUserCard);
  const router = useRouter();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileInputProfile, setProfileInputProfile] = useState<string>("");
  const [isChangeProfilePicModalOpen, setIsChangeProfilePicModalOpen] =
    useState<boolean>(false);
  const handleChangeProfilePicModalOpen = () => {
    setIsChangeProfilePicModalOpen(true);
  };
  const handleChangeProfilePicModalClose = () => {
    setIsChangeProfilePicModalOpen(false);
  };
  const handleProfilePicChange = async () => {
    if (!profileInputProfile) return;
    try {
      setIsUpdatingProfile(true);
      await userService.changeProfilePic(profileInputProfile);
      handleChangeProfilePicModalClose();
      router.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const r = error.response.data as CustomApiResponse;
        console.error(r.message);
        alert(r.message);
      } else {
        console.error(error);
      }
    }
    setIsUpdatingProfile(false);
  };

  const matchedRoles = user.roles?.filter((e) => {
    return e.roleRef === user.organization?.orgId && e.userRef === user.uid;
  });

  // Support only 1 main role.
  const matchedRoleName = matchedRoles?.length
    ? matchedRoles[0].data.displayPosition
    : "";

  return (
    <>
      <Card
        props={{
          p: 0,
          w: "full",
          overflow: "hidden",
        }}
      >
        <Box
          h="200px"
          w="100%"
          position="relative"
          background="linear-gradient(155deg, rgba(206,250,252,1) 0%, rgba(203,213,255,1) 100%)"
        >
          <Box position="absolute" bottom="-55px" left={["20px"]}>
            <Box position="relative">
              <Avatar
                width="110px"
                height="110px"
                borderStyle="solid"
                borderWidth="5px"
                borderColor={useColorModeValue("card.light", "card.dark")}
                src={user.profileImageUrl}
              ></Avatar>
              <Box position="absolute" bottom="14px" right="2px">
                <IconButton
                  size="sm"
                  rounded="full"
                  aria-label="profile-pic-edit"
                  colorScheme="kraikub.blue.always"
                  color="white"
                  onClick={handleChangeProfilePicModalOpen}
                >
                  <MdEdit size="20px" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <CardContent props={{ ...cardContentProps.props, py: 4 }}>
          <Flex justifyContent="end">
            <IconButton
              aria-label="profile-more-button"
              variant="ghost"
              rounded="full"
              fontSize={20}
            >
              <IoMdMore />
            </IconButton>
          </Flex>
        </CardContent>
        <CardContent {...cardContentProps}>
          <VStack spacing={2} alignItems="start">
            <Heading size="lg">
              {user.student?.nameEn || user.fullName}
            </Heading>
            <Text opacity={0.7}>{t(user.type)}</Text>
            <HStack spacing={2}>
              <Text>
                <strong>@{user.username}</strong>
              </Text>

              {user.orgId ? (
                <>
                  <BsDot opacity={0.6} size="20px" />
                  <Text>
                    {matchedRoleName} {t("at")} {user.organization?.orgName}
                  </Text>
                </>
              ) : null}
            </HStack>
          </VStack>
          <ButtonGroup mt={6} spacing={[0, 2]} flexWrap="wrap" rowGap={2}>
            <Link href="/id/organization">
              <a>
                <Button variant="outline" {...menuButtonProps}>
                  {user.orgId
                    ? t("View organization")
                    : t("Create/Join an organization")}
                </Button>
              </a>
            </Link>
          </ButtonGroup>
        </CardContent>
      </Card>
      <Modal
        isOpen={isChangeProfilePicModalOpen}
        onClose={handleChangeProfilePicModalClose}
        size="3xl"
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("Change profile picture")}</ModalHeader>
          <ModalCloseButton rounded="full" />
          <ModalBody>
            <Text>{t("change-desc")}</Text>
            <VStack my={4}>
              <Avatar src={profileInputProfile} size="2xl" />
              <Text opacity={0.6}>{t("Preview")}</Text>
            </VStack>
            <Input
              w="full"
              variant="filled"
              placeholder="https://"
              onChange={(e) => setProfileInputProfile(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <ButtonGroup
              rowGap={2}
              spacing={[0, 0, 2]}
              flexDir={["column", "column", "row"]}
              w="full"
              size="lg"
              justifyContent="end"
            >
              <Button onClick={handleChangeProfilePicModalClose}>
                {t("Cancel")}
              </Button>
              <Button
                colorScheme="kraikub.blue.always"
                color="white"
                size="lg"
                isLoading={isUpdatingProfile}
                onClick={handleProfilePicChange}
                isDisabled={!profileInputProfile}
              >
                {t("Change profile picture")}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
