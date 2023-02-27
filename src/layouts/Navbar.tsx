import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useUser } from "../contexts/User";
import { SmartLanguageToggler } from "../components/SmartLanguageToggler";
import { useOnClient } from "../hooks/on-client";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import { p } from "../utils/path";
import { appConfig } from "../../api/config/app";
import { MdLogout } from "react-icons/md";
import { useClientTranslation } from "../hooks/client-translation";
import { navbarDict } from "../translate/navbar";
import { LinkWrap } from "../components/LinkWrap";
import { CustomDivider } from "../components/CustomDivider";
import { usernameWithFixLength } from "../utils/string";

interface TabProps {
  href?: string;
  onClick?: () => void;
  text: string;
}

const Tab: FC<TabProps> = (props) => {
  const router = useRouter();
  const activeButtonBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const tabButtonStyles: ButtonProps = {
    rounded: 10,
    variant: "ghost",
    fontSize: 14,
    fontWeight: router.asPath === props.href ? 600 : 500,
    letterSpacing: "-0.02em",
    bg: router.asPath === props.href ? activeButtonBg : "transparent",
    _hover: {
      bg: activeButtonBg,
    },
    opacity: router.asPath === props.href ? 1 : 0.6,
  };
  return (
    <Box>
      <LinkWrap href={props.href}>
        <Button {...tabButtonStyles} onClick={props.onClick}>
          {props.text}
        </Button>
      </LinkWrap>
    </Box>
  );
};

const Navbar: FC = () => {
  const { user, signout } = useUser();
  const { colorMode } = useColorMode();
  const { t } = useClientTranslation(navbarDict);
  const [showUserModal, setShowUserModal] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navModal, setNavModal] = useState(false);
  const ready = useOnClient();

  const onNavModalClose = () => {
    setNavModal(false);
  };

  const onUserModalClose = () => {
    setShowUserModal(false);
  };

  const onUserModalOpen = () => {
    setShowUserModal(true);
  };

  const gridBorderDividerColor = useColorModeValue(
    "blackAlpha.300",
    "whiteAlpha.300"
  );

  const navModalMenuButtonStyles = {
    width: "full",
    whiteSpave: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    variant: "ghost",
    rounded: 10,
    justifyContent: "start",
    fontSize: 20,
    size: "lg",
    w: "full",
  };

  const navStyles = {
    desktop: {
      bg: useColorModeValue("card.light", "card.dark"),
      borderStyle: "solid",
      borderWidth: shadow ? "0px" : "0 0 1px 0",
      borderColor: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      boxShadow: shadow ? "0 2px 5px 1px #00000038" : "none",
      transition: "300ms ease",
    },
    mobile: {
      bg: useColorModeValue("card.light", "card.dark"),
    },
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY === 0) {
        setShadow(false);
      } else {
        setShadow(true);
      }
    });
  }, []);

  if (!user || !ready) {
    return null;
  }

  const tabs = [
    {
      text: t("menu-id"),
      href: p.kraikubId,
      name: "kraikubid",
    },
    {
      text: t("menu-apps"),
      href: p.projects,
      name: "applications",
    },
    {
      text: t("menu-org"),
      href: p.organization,
      name: "organization",
    },
    {
      text: t("menu-settings"),
      href: p.settings,
      name: "settings",
    },
  ];

  return (
    <>
      <Box
        {...navStyles.desktop}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={600}
      >
        <Container
          maxW="container.xl"
          py="14px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack alignItems="center" spacing={6}>
            <LinkWrap href="/">
              <HStack spacing={2}>
                <Image
                  src={`https://kraikub.com/static/logo/transparent/${
                    colorMode === "light" ? "color" : "white"
                  }/kraikub-logo-128.png`}
                  width="24px"
                  alt="kraikub-nav-logo"
                  rounded={10}
                />
                <Heading
                  fontSize={16}
                  fontWeight={700}
                  display={["none", "block"]}
                >
                  KRAIKUB{" "}
                </Heading>
              </HStack>
            </LinkWrap>
          </HStack>
          <HStack spacing={2} display={["none", "none", "flex"]}>
            {tabs.map((e, i) => {
              return (
                <Tab
                  key={`tab-${i}`}
                  {...e}
                  text={
                    e.name === "kraikubid" && user.username
                      ? `@${usernameWithFixLength(user.username, 16)}`
                      : e.text
                  }
                />
              );
            })}
          </HStack>
          <Flex alignItems="center" gap={4}>
            <HStack spacing={3}>
              {/* <ThemeToggler /> */}
              <Box display={["none", "none", "flex"]}>
                <SmartLanguageToggler sx={{ size: "sm" }} />
              </Box>
              <Avatar
                src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
                name={
                  user.student?.nameEn.split(" ").slice(1).join(" ") ||
                  user.fullName
                }
                w="44px"
                h="44px"
                display={["none", "none", "block"]}
                onClick={onUserModalOpen}
                cursor="pointer"
                transition="300ms ease"
                _hover={{
                  boxShadow: "0 0 0 3px #35bda4",
                }}
              />

              <IconButton
                aria-label="mobile-nav-menu"
                display={["flex", "flex", "none"]}
                onClick={() => setNavModal(true)}
                rounded={8}
                variant="unsyled"
              >
                <IoIosMenu size="24px" />
              </IconButton>
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Drawer
        isOpen={navModal}
        placement="right"
        onClose={onNavModalClose}
        size="full"
      >
        <DrawerContent p={4} {...navStyles.mobile}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              opacity={0.6}
              fontWeight={500}
              fontSize={14}
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              {t("mobile-nav-title")}
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={3}>
              {tabs.map((e, i) => {
                return (
                  <Box key={`mobile-menu-${i}`} w="full">
                    <Link href={e.href || ""}>
                      <a>
                        <Button {...navModalMenuButtonStyles}>
                          {e.name === "kraikubid" && user.username
                            ? `@${user.username}`
                            : e.text}
                        </Button>
                      </a>
                    </Link>
                  </Box>
                );
              })}
            </VStack>
            <CustomDivider />
            <Box py={8}>
              <HStack spacing={3}>
                <Avatar
                  src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
                  name={
                    user.student?.nameEn.split(" ").slice(1).join(" ") ||
                    user.fullName
                  }
                  size="md"
                />
                <Box>
                  <Heading size="md">{user.fullName}</Heading>
                  <Text fontWeight={500} opacity={0.7}>
                    @{user.username}
                  </Text>
                </Box>
              </HStack>
            </Box>
            <VStack></VStack>
          </DrawerBody>

          <DrawerFooter flexDirection="column" gap={4} pb="80px">
            <SmartLanguageToggler
              sx={{
                width: "full",
                h: "64px",
                variant: "solid",
                rounded: 16,
                size: "lg",
              }}
            />
            <Button
              w="full"
              size="lg"
              h="64px"
              rounded={16}
              gap={3}
              onClick={signout}
              colorScheme="kraikub.green.always"
              color="white"
            >
              {t("menu-logout")} <MdLogout size="20px" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={showUserModal} onClose={onUserModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={14}>{t("signed-in-as")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={700}>
              {user.student?.nameEn || user.fullName}
            </Text>
            <Text fontSize={14} opacity={0.6}>
              @{user.username}
            </Text>
            <VStack mt={10} spacing={3}>
              <Link href={p.kraikubId}>
                <a style={{ display: "block", width: "100%" }}>
                  <Button
                    variant="solid"
                    size="lg"
                    w="full"
                    rounded={8}
                    justifyContent="start"
                  >
                    {t("menu-id")}
                  </Button>
                </a>
              </Link>
              <Button
                variant="solid"
                w="full"
                size="lg"
                rounded={8}
                colorScheme="kraikub.green.always"
                color="white"
                justifyContent="start"
                onClick={signout}
                gap={2}
              >
                {t("menu-logout")} <MdLogout size="20px" />
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Navbar;
