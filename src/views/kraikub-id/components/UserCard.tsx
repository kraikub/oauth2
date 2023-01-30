import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  position,
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
import { profileCollections } from "../../../../api/config/app";
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
  const [profileSelector, setProfileSelector] = useState<{
    key: string;
    index: number;
  }>();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangeProfilePicModalOpen, setIsChangeProfilePicModalOpen] =
    useState<boolean>(false);
  const handleChangeProfilePicModalOpen = () => {
    setIsChangeProfilePicModalOpen(true);
  };
  const handleChangeProfilePicModalClose = () => {
    setIsChangeProfilePicModalOpen(false);
  };
  const handleProfilePicChange = async () => {
    if (!profileSelector) return alert("No profile selected");
    try {
      setIsUpdatingProfile(true);
      await userService.changeProfilePic(profileSelector.key, profileSelector.index);
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
          backgroundImage="url(https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=2000&t=st=1675069219~exp=1675069819~hmac=f9e878a28bd0ce0282155ac1ba0fec364b91cc187b6c883f1de7b226474b033a)"
          backgroundSize="cover"
          backgroundPosition="center"
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
                  bg="black"
                  color="white"
                  borderStyle="solid"
                  borderWidth="2px"
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                  borderColor={useColorModeValue("card.light", "card.dark")}
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
            <Heading size="lg">{user.fullName}</Heading>
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
        <ModalContent maxH="90vh">
          <ModalHeader>{t("Change profile picture")}</ModalHeader>
          <ModalCloseButton rounded="full" />
          <ModalBody overflowY="auto">
            {Object.keys(profileCollections).map((key, index) => {
              let collection = profileCollections[key];
              return (
                <>
                  <Heading size="sm" mb={2} opacity={0.8}>
                    {collection.name}
                  </Heading>
                  <Grid
                    templateColumns="repeat(12, 1fr)"
                    gap={1}
                    key={`profile-collection-${index}`}
                  >
                    {collection.urls.map((url, k) => {
                      const fullUrl = collection.baseUrl + url;
                      return (
                        <GridItem
                          colSpan={[6, 3]}
                          key={`profile-${index}-${k}`}
                        >
                          <Box
                            cursor="pointer"
                            position="relative"
                            transition="300ms ease"
                            boxShadow={
                              profileSelector?.index === k &&
                              profileSelector?.key === key
                                ? "0 0 0 4px #392bfc"
                                : "none"
                            }
                            onClick={() =>
                              setProfileSelector({ key: key, index: k })
                            }
                          >
                            <Image
                              w="full"
                              src={fullUrl}
                              alt={`${collection.name}-${k}`}
                            />
                            <Box position="absolute" bottom="10px" right="10px" display={
                              profileSelector?.index === k &&
                              profileSelector?.key === key
                                ? "block"
                                : "none"
                            }>
                              <CheckCircleIcon color="#392bfc" fontSize="30px"/>
                            </Box>
                          </Box>
                        </GridItem>
                      );
                    })}
                  </Grid>
                </>
              );
            })}
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
                colorScheme="kraikub.green.always"
                color="white"
                size="lg"
                isLoading={isUpdatingProfile}
                onClick={handleProfilePicChange}
                isDisabled={!profileSelector}
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
