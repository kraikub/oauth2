import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
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
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useUser } from "../contexts/User";
import { SmartLanguageToggler } from "../components/SmartLanguageToggler";
import { useOnClient } from "../hooks/on-client";
import { IoIosArrowDown, IoIosCloseCircle, IoIosMenu } from "react-icons/io";
import { Card } from "../components/Card";
import Link from "next/link";
import { ThemeToggler } from "../components/ThemeToggler";
import { p } from "../utils/path";
import { appConfig } from "../../api/config/app";
import { MdLogout } from "react-icons/md";
import { useClientTranslation } from "../hooks/client-translation";
import { navbarDict } from "../translate/navbar";
import { LinkWrap } from "../components/LinkWrap";

interface TabProps {
  href?: string;
  onClick?: () => void;
  text: string;
}

const Tab: FC<TabProps> = (props) => {
  const router = useRouter();
  const activeButtonBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const tabButtonStyles: ButtonProps = {
    rounded: 6,
    variant: "ghost",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.03em",
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
  const { t } = useClientTranslation(navbarDict);
  const [showUserModal, setShowUserModal] = useState(false);
  const [navModal, setNavModal] = useState(false);
  const menuBarBg = useColorModeValue("bg.light", "bg.dark");
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
      borderWidth: "0 0 1px 0",
      borderColor: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    },
    mobile: {
      bg: useColorModeValue("blackAlpha.700", "blackAlpha.700"),
      color: "white",
    },
  };

  const modalStyles = {
    bg: useColorModeValue("white", "whiteAlpha.100"),
    backdropFilter: "blur(50px)",
  };

  if (!user || !ready) {
    return null;
  }

  const tabs = [
    {
      text: t("menu-id"),
      href: p.kraikubId,
    },
    {
      text: t("menu-apps"),
      href: p.projects,
    },
    {
      text: t("menu-org"),
      href: p.organization,
    },
    {
      text: t("menu-settings"),
      href: p.settings,
    },
  ];

  return (
    <>
      <Box {...navStyles.desktop}>
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
                  src="/kraikub-logo-app-with-outline.png"
                  width="40px"
                  alt="kraikub-nav-logo"
                  borderStyle="solid"
                  borderWidth="1px"
                  rounded={10}
                />
                <Heading size="sm" fontWeight={700} letterSpacing="-0.06em">
                  KRAIKUB{" "}
                </Heading>
              </HStack>
            </LinkWrap>
          </HStack>
          <HStack spacing={2} display={["none", "none", "flex"]}>
            {tabs.map((e, i) => {
              return <Tab key={`tab-${i}`} {...e} />;
            })}
          </HStack>
          <Flex alignItems="center" gap={4}>
            <HStack spacing={3}>
              <ThemeToggler />
              <Box display={["none", "flex"]}>
                <SmartLanguageToggler sx={{ size: "sm" }} />
              </Box>
              <Avatar
                src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
                name={
                  user.student?.nameEn.split(" ").slice(1).join(" ") ||
                  user.fullName
                }
                w="34px"
                h="34px"
                onClick={onUserModalOpen}
                cursor="pointer"
                transition="300ms ease"
                _hover={{
                  boxShadow: "0 0 0 2px #3182f5",
                }}
              />

              <IconButton
                aria-label="mobile-nav-menu"
                display={["flex", "none"]}
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
        <DrawerContent p={4} backdropFilter="blur(20px)" {...navStyles.mobile}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              opacity={0.6}
              fontWeight={500}
              fontSize={14}
              textTransform="uppercase"
              fontFamily={`'Rubik', sans-serif`}
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
                        <Button {...navModalMenuButtonStyles}>{e.text}</Button>
                      </a>
                    </Link>
                  </Box>
                );
              })}
              <SmartLanguageToggler sx={{ width: "full" }} />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              w="full"
              size="lg"
              gap={3}
              onClick={signout}
              bg="kraikub.blue.500"
              _hover={{ bg: undefined }}
              _active={{ bg: undefined }}
            >
              {t("menu-logout")} <MdLogout size="20px" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={showUserModal} onClose={onUserModalClose} isCentered>
        <ModalOverlay />
        <ModalContent {...modalStyles}>
          <ModalHeader fontSize={14}>{t("signed-in-as")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={700}>
              {user.student?.nameEn || user.fullName}
            </Text>
            <Text fontSize={14} opacity={0.6}>
              {user.student?.nameTh || user.fullName}
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
                colorScheme="kraikub.blue.always"
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
      {/* <Box position="sticky" top={0} zIndex={59} {...navStyles.desktop}>
        <Container
          maxW="container.xl"
          h="48px"
          alignItems="end"
          display={["flex", "flex"]}
          overflowX="auto"
        >
          <ButtonGroup
            w="full"
            borderStyle="solid"
            borderWidth="0 0 1px 0"
            borderColor={gridBorderDividerColor}
          >
            {tabs.map((e, i) => {
              return <Tab key={`tab-${i}`} {...e} />;
            })}
          </ButtonGroup>
        </Container>
      </Box> */}
    </>
  );
};
export default Navbar;
