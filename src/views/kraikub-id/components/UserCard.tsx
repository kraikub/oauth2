import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
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
      await userService.changeProfilePic(
        profileSelector.key,
        profileSelector.index
      );
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
          position="relative"
          h="28vh"
          display={["block", "none"]}
          backgroundImage="url(https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06085555/dribbble_1.gif)"
          backgroundSize="cover"
          backgroundPosition="center"
        ></Box>
        <Box h={["30vh", "40vh"]} w="100%" position="relative">
          <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={32}
          >
            <Box
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              bg="blackAlpha.50"
              zIndex={41}
            />
            <Box
              position="absolute"
              left={[0, "40%"]}
              right={0}
              top={0}
              bottom={0}
              backgroundImage="url(https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06085555/dribbble_1.gif)"
              backgroundSize="cover"
              backgroundPosition="center"
              zIndex={40}
            ></Box>
            <Box
              position="absolute"
              left={0}
              w={["100%", "40%"]}
              top={0}
              bottom={0}
              backgroundImage="url(https://i.graphicmama.com/blog/wp-content/uploads/2016/12/06085555/dribbble_1.gif)"
              backgroundSize="cover"
              backgroundPosition="center"
              zIndex={40}
            >
              <Box
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                bg="blackAlpha.600"
                backdropFilter="blur(20px)"
                py={8}
                px={6}
                color="white"
              >
                <Text textTransform="uppercase" fontWeight={600} fontSize={12}>
                  KRAIKUB ID
                </Text>
                <Heading size="md" fontWeight={500} mt={2}>
                  The most innovative way to use your university account
                </Heading>
                <Text mt={3} opacity={0.6} fontSize={12}>
                  KRAIKUB ID is one of the most advanced university account ever
                  created.
                </Text>
              </Box>
            </Box>
          </Box>
          <Box position="absolute" bottom="-55px" left={["20px"]} zIndex={35}>
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
            <Text
              opacity={0.7}
              textTransform="uppercase"
              fontSize={12}
              fontWeight={600}
            >
              {t(user.type)}
            </Text>
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
                  <Text
                    fontWeight={700}
                    fontSize={12}
                    mt={4}
                    mb={2}
                    opacity={0.6}
                    textTransform="uppercase"
                  >
                    {collection.name}
                  </Text>
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
                            <AspectRatio ratio={1} width="100%">
                              <Image
                                w="full"
                                src={fullUrl}
                                alt={`${collection.name}-${k}`}
                              />
                            </AspectRatio>
                            <Box
                              position="absolute"
                              bottom="10px"
                              right="10px"
                              display={
                                profileSelector?.index === k &&
                                profileSelector?.key === key
                                  ? "block"
                                  : "none"
                              }
                            >
                              <CheckCircleIcon
                                color="#392bfc"
                                fontSize="30px"
                              />
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
