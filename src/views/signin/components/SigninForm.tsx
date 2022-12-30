import {
  Container,
  Flex,
  Heading,
  Button,
  Box,
  Text,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  ButtonGroup,
  Stack,
  Link,
  Progress,
  IconButton,
  useColorModeValue,
  Input,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FC,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { authService } from "../../../services/authService";
import { PrimaryInput } from "../PrimaryInput";
import { ConsentForm } from "./ConsentForm";
import { SimpleFadeInLeft } from "../../../components/animations/SimpleFadeInLeft";
import { FaArrowRight } from "react-icons/fa";
import { FooterShort } from "../../../layouts/FooterShort";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userService } from "../../../services/userService";
import { UserSelector } from "./UserSelector";
import { useCookies } from "react-cookie";
import { LangSetup } from "./LangSetup";
import { CookieConsentScreen } from "./CookieConsentScreen";
import { Setup } from "./Setup";
import { useTranslation } from "react-i18next";
import { TwoFactor } from "./TwoFactor";

interface SigninFormProps {
  query: {
    client_id: string;
    state?: string | string[] | null;
    scope: string;
    dev?: string | string[] | null;
    secret?: string | string[] | null;
    redirect_uri: string;
    response_type: string;
    code_challenge: string | string[] | null;
    code_challenge_method: string | string[] | null;
  };
  app: Application;
  secret?: string;
  sdk?: boolean;
  onSigninComplete?: (code: string) => void;
}

export const SigninForm: FC<SigninFormProps> = ({ query, app, secret }) => {
  const { t } = useTranslation("signin");
  const router = useRouter();
  const [pdpaPopup, setPdpaPopup] = useState<boolean>(false);
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigninButtonLoading, setIsSigninLoading] = useState<boolean>(false);
  const [deviceConfigCheck, setDeviceConfigCheck] = useState<boolean>(false);
  const deviceConfigRef = useRef<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<FullUserData | null>();
  const [cookies] = useCookies(["LANG", "ACCEPT_COOKIES"]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [OTPRef, setOTPRef] = useState("");
  const [authForEmail, setAuthForEmail] = useState("");
  const styles = {
    input: {
      bg: useColorModeValue("blackAlpha.100", "whiteAlpha.200"),
      _hover: {
        bg: useColorModeValue("blackAlpha.300", "whiteAlpha.400"),
      },
    },
    layout: {
      container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },

    highlight: {
      color: useColorModeValue("teal.400", "teal.200"),
    },

    pdpaOverride: {
      container: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        bg: useColorModeValue("blackAlpha.50", "whiteAlpha.100"),
        backdropFilter: "blur(30px)",
      },
    },
  };

  const closeErrorAlert = () => {
    setOpenAlert(false);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toConsent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSigninLoading(true);
    setTimeout(() => {
      setStep(1);
      setIsSigninLoading(false);
    }, 1000);
  };
  const backToSigninForm = () => {
    setPdpaPopup(false);
    setStep(0);
  };

  const validateBeforeSignin = async () => {
    const { data: validateResponse } =
      await authService.validateSigninSignature(username);
    if (validateResponse.payload.validateResult) {
      return await handleSigninEvent();
    }
    setPdpaPopup(true);
  };

  const handleSigninEvent = async (options?: SigninOptions) => {
    if (app == null || query.scope === null) return;
    setIsSigninLoading(true);
    if ((!username || !password) && options?.signin_method !== "credential") {
      setIsSigninLoading(false);
      return alert("Some field is missing.");
    }
    try {
      const { data } = await authService.signin({
        username,
        password,
        clientId: app.clientId,
        scope: query.scope as string,
        state: query.state as string,
        secret: secret || (query.secret as string | undefined),
        redirectUri: query.redirect_uri as string,
        response_type: query.response_type,
        code_challenge: query.code_challenge as string,
        code_challenge_method: query.code_challenge_method as string,
        options,
      });

      if (data.payload.otp_ref) {
        setOTPRef(data.payload.otp_ref);
      }

      if (data.payload.email) {
        setAuthForEmail(data.payload.email);
      }
      if (data.message === "Require 2fa" && data.status === false) {
        setStep(2);
        return;
      }
      if (data.payload.url) {
        return router.push(data.payload.url);
      } else {
        setOpenAlert(true);
        backToSigninForm();
      }
    } catch (error) {
      setIsSigninLoading(false);
      console.error(error);
      setPdpaPopup(false);
      if (step !== 2) {
        backToSigninForm();
      }
      setOpenAlert(true);
    }
  };

  const checkActiveUser = async () => {
    try {
      const { status, data } = await userService.get();
      setActiveUser(data.payload);
    } catch (error) {
      setActiveUser(null);
    }
  };

  const initDeviceCheck = () => {
    deviceConfigRef.current = {
      cookieConsent: cookies.ACCEPT_COOKIES ? true : false,
      lang: cookies.LANG ? true : false,
    };
    setDeviceConfigCheck(true);
  };

  useEffect(() => {
    initDeviceCheck();
    checkActiveUser();
  }, []);

  if (!deviceConfigCheck) return null;

  if (
    deviceConfigCheck &&
    (!deviceConfigRef.current.lang || !deviceConfigRef.current.cookieConsent)
  ) {
    return <Setup />;
  }

  if (activeUser === undefined) {
    return null;
  } else if (activeUser === null) {
    return (
      <Fragment>
        <Head>
          <title>Signin with KU</title>
          <meta property="og:title" content={`Kraikub - Sign in with KU`} />
          <meta
            property="og:description"
            content={`Sign in to ${app?.appName} with your Kasetsart Account.`}
          />
        </Head>
        <Box>
          <Container
            maxW={500}
            height="100vh"
            py="4%"
            {...styles.layout.container}
          >
            {step === 1 ? (
              <ConsentForm
                scope={query.scope}
                appName={app?.appName}
                handleSignin={validateBeforeSignin}
                handleReject={backToSigninForm}
                loading={isSigninButtonLoading}
              />
            ) : step === 2 ? (
              <TwoFactor
                setStep={setStep}
                handleSignin={handleSigninEvent}
                OTPRef={OTPRef}
                authForEmail={authForEmail}
              />
            ) : (
              <Box w="100%" overflow="hidden">
                <SimpleFadeInLeft>
                  <form onSubmit={toConsent}>
                    <Flex
                      minH="60vh"
                      h="auto"
                      px="30px"
                      py="40px"
                      direction="column"
                      alignItems="center"
                      gap="20px"
                    >
                      <Heading size="lg" letterSpacing="-1.5px" lang="en">
                        {t("form-title")}
                      </Heading>
                      <Text>{t("form-description")}</Text>
                      <Box mt="30px" w="full">
                        <Text fontSize={14}>
                          {t("form-app-text")}
                          <Box as="span" fontWeight={700} {...styles.highlight}>
                            {" "}
                            {app?.appName}
                          </Box>
                        </Text>
                      </Box>
                      <Box mt="10px" w="full">
                        <Progress
                          size="xs"
                          isIndeterminate
                          colorScheme="teal"
                          background="transparent"
                          opacity={isSigninButtonLoading ? 1 : 0}
                        />
                        <Input
                          variant="filled"
                          borderRadius="8px 8px 0 0"
                          size="lg"
                          placeholder={t("form-input-username") as string}
                          onChange={handleUsernameChange}
                          value={username}
                          {...styles.input}
                        />
                        <Divider />
                        <Box position="relative">
                          <Input
                            variant="filled"
                            size="lg"
                            placeholder={t("form-input-password") as string}
                            borderRadius="0 0 8px 8px"
                            type={showPassword ? "text" : "password"}
                            onChange={handlePasswordChange}
                            value={password}
                            {...styles.input}
                          />
                          <IconButton
                            aria-label="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                            position="absolute"
                            top="50%"
                            right="10px"
                            transform="translate(0,-50%);"
                            fontSize={20}
                            variant="ghost"
                            size="sm"
                          >
                            {!showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                          </IconButton>
                        </Box>
                      </Box>
                      <IconButton
                        isLoading={isSigninButtonLoading}
                        type="submit"
                        disabled={!username || !password}
                        aria-label="sign-in-button"
                        // color="#00000060"
                        rounded="full"
                        colorScheme="teal"
                        // border="1px solid #00000030"
                      >
                        <FaArrowRight color="inherit" />
                      </IconButton>
                    </Flex>
                  </form>
                </SimpleFadeInLeft>
              </Box>
            )}
          </Container>
          <FooterShort />
        </Box>

        <Drawer
          placement={"bottom"}
          onClose={() => setPdpaPopup(false)}
          isOpen={pdpaPopup}
        >
          <DrawerContent
            position="relative"
            minH="82vh"
            maxH="96vh"
            py={14}
            borderRadius="8px 8px 0 0"
            {...styles.pdpaOverride.container}
          >
            <Box position="absolute" right="20px" top="20px">
              <CloseButton
                color="gray.700"
                bg="gray.50"
                rounded="full"
                onClick={() => setPdpaPopup(false)}
              />
            </Box>
            <DrawerBody>
              <Container maxW="container.lg" overflow="auto">
                <Stack spacing={10}>
                  <Heading size="md">
                    Sorry, PDPA Agreement will comming soon. 🙁
                  </Heading>
                  <Text>Agree a PDPA with the button below</Text>
                </Stack>
              </Container>
            </DrawerBody>
            <DrawerFooter>
              <Container maxW="container.lg">
                <ButtonGroup justifyContent="end" w="full">
                  <Button
                    size="lg"
                    rounded={6}
                    onClick={backToSigninForm}
                    variant="ghost"
                  >
                    Disagree
                  </Button>
                  <Button
                    size="lg"
                    colorScheme="teal"
                    rounded={6}
                    onClick={() => handleSigninEvent()}
                    isLoading={isSigninButtonLoading}
                  >
                    Agree
                  </Button>
                </ButtonGroup>
              </Container>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <ErrorModal open={openAlert} onClose={closeErrorAlert} />
      </Fragment>
    );
  } else {
    return (
      <UserSelector
        user={activeUser}
        reject={() => setActiveUser(null)}
        handleSignin={handleSigninEvent}
        loading={isSigninButtonLoading}
      />
    );
  }
};

interface ErrorModalProps {
  open: boolean;
  onClose: any;
}

const ErrorModal: FC<ErrorModalProps> = ({ open, onClose }) => {
  const bg = useColorModeValue("whiteAlpha.800", "whiteAlpha.200");
  const { t } = useTranslation("signin");
  const styles = {
    bg,
    backdropFilter: "blur(30px)",
  };
  return (
    <Modal isOpen={open} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent {...styles}>
        <ModalHeader>{t("err-modal-header")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize={14}>{t("err-modal-description")}</ModalBody>

        <ModalFooter>
          <Button onClick={onClose} colorScheme="teal">
            {t("err-modal-btn-close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
