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
  DrawerFooter,
  ButtonGroup,
  Stack,
  Progress,
  IconButton,
  useColorModeValue,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
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
import { ConsentForm } from "./ConsentForm";
import { SimpleFadeInLeft } from "../../../components/animations/SimpleFadeInLeft";
import { FooterShort } from "../../../layouts/FooterShort";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userService } from "../../../services/userService";
import { UserSelector } from "./UserSelector";
import { useCookies } from "react-cookie";
import { Setup } from "./Setup";
import { useTranslation } from "react-i18next";
import { TwoFactor } from "./TwoFactor";
import { CustomDivider } from "../../../components/CustomDivider";
import Link from "next/link";
import { Card } from "../../../components/Card";
import { DynamicContainer } from "../../../layouts/DynamicContainer";

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
  const [email, setEmail] = useState<string>("");
  const [isSigninButtonLoading, setIsSigninLoading] = useState<boolean>(false);
  const [deviceConfigCheck, setDeviceConfigCheck] = useState<boolean>(false);
  const deviceConfigRef = useRef<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<FullUserData | null>();
  const [cookies] = useCookies(["LANG", "ACCEPT_COOKIES"]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [OTPRef, setOTPRef] = useState("");
  const [OTPExpire, setOTPExpire] = useState<number>(0);
  const [authForEmail, setAuthForEmail] = useState("");

  const [signInMethod, setSigninMethod] = useState<SignInMethodType>("nontri");

  const styles = {
    button: {
      bg: useColorModeValue("blackAlpha.100", "whiteAlpha.300"),
      color: useColorModeValue("kraikub.green.600", "kraikub.green.400"),
      fontSize: 14,
      fontWeight: 600,
    },
    input: {
      fontWeight: 500,
      bg: useColorModeValue("blackAlpha.100", "whiteAlpha.300"),
      _hover: {
        bg: useColorModeValue("blackAlpha.300", "whiteAlpha.400"),
      },
      _placeholder: {
        color: useColorModeValue("blackAlpha.600", "whiteAlpha.600"),
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
      color: "kraikub.green.500",
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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changeToNontri = () => {
    setEmail("");
    setSigninMethod("nontri");
  };

  const changeToKraikubId = () => {
    setUsername("");
    setPassword("");
    setSigninMethod("kraikubid");
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
    setIsSigninLoading(false);
    setStep(0);
  };

  const validateBeforeSignin = async () => {
    if (activeUser)
      return await handleSigninEvent({ signin_method: "credential" });
    if (signInMethod === "kraikubid")
      return await handleSigninEvent({ signin_method: "kraikubid" });
    const { data: validateResponse } =
      await authService.validateSigninSignature(username);
    if (validateResponse.payload.validateResult) {
      return await handleSigninEvent({ signin_method: signInMethod });
    }
    setPdpaPopup(true);
  };

  const handleNextWhenHasActiveUser = () => {
    setStep(1);
  };

  const handleSigninEvent = async (options?: SigninOptions) => {
    if (app == null || query.scope === null) return;
    setIsSigninLoading(true);
    // Validate for before it is sent to backend
    if (options?.signin_method === "credential") {
      //
    } else if (options?.signin_method === "kraikubid") {
      if (!email) {
        return alert("Require email");
      }
    } else if (options?.signin_method === "nontri") {
      if (!username || !password) {
        return alert("Some field is missing.");
      }
    } else {
      return console.error("Unknown sign in method");
    }
    try {
      const { data } = await authService.signin({
        username,
        password,
        clientId: app.clientId,
        email: email,
        scope: query.scope as string,
        state: query.state as string,
        secret: secret || (query.secret as string | undefined),
        redirectUri: query.redirect_uri as string,
        response_type: query.response_type,
        code_challenge: query.code_challenge as string,
        code_challenge_method: query.code_challenge_method as string,
        options: {
          ...options,
        },
      });

      if (data.payload.otp_ref) {
        setOTPRef(data.payload.otp_ref);
      }

      if (data.payload.otp_expire) {
        setOTPExpire(data.payload.otp_expire);
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
  } else {
    return (
      <Fragment>
        <Head>
          <title>Sign in with Kasetsart</title>
          <meta
            property="og:title"
            content={`Kraikub - Sign in with Kasetsart`}
          />
          <meta
            property="og:description"
            content={`Sign in to ${app?.appName} with your Kasetsart Account.`}
          />
        </Head>
        <Box>
          <DynamicContainer
            containerProps={{
              maxW: "500px",
              height: "100vh",
              py: "4%",
              ...styles.layout.container,
            }}
          >
            {step === 1 ? (
              <ConsentForm
                scope={query.scope}
                appName={app?.appName}
                handleSignin={validateBeforeSignin}
                handleReject={backToSigninForm}
                loading={isSigninButtonLoading}
                signInMethod={signInMethod}
              />
            ) : step === 2 ? (
              <TwoFactor
                handleSignin={handleSigninEvent}
                OTPRef={OTPRef}
                OTPExpire={OTPExpire}
                authForEmail={authForEmail}
                back={backToSigninForm}
                signInMethod={signInMethod}
              />
            ) : activeUser ? (
              <UserSelector
                setSigninMethod={setSigninMethod}
                user={activeUser}
                reject={() => {
                  setActiveUser(null);
                  setSigninMethod("nontri");
                }}
                next={handleNextWhenHasActiveUser}
                loading={isSigninButtonLoading}
              />
            ) : (
              // Begin sign in form
              <Box w="100%" overflow="hidden">
                <SimpleFadeInLeft>
                  <Card hideMobileBorder>
                    <form onSubmit={toConsent}>
                      <Flex
                        minH="60vh"
                        h="auto"
                        pt="40px"
                        direction="column"
                        alignItems="center"
                        gap="20px"
                      >
                        <Heading size="lg">{t("form-title")}</Heading>
                        <Text
                          textTransform="uppercase"
                          fontWeight={600}
                          opacity={0.6}
                        >
                          {t("form-description")}
                        </Text>
                        <Box mt="30px" w="full">
                          <Text fontSize={14}>
                            {t("form-app-text")}
                            <Box
                              as="span"
                              fontWeight={700}
                              {...styles.highlight}
                            >
                              {" "}
                              {app?.appName}
                            </Box>
                          </Text>
                        </Box>
                        <Box mt="10px" w="full">
                          <Progress
                            size="xs"
                            isIndeterminate
                            colorScheme="kraikub.green.always"
                            background="transparent"
                            opacity={isSigninButtonLoading ? 1 : 0}
                          />
                          {signInMethod === "nontri" ? (
                            <>
                              <Input
                                variant="outlined"
                                borderRadius="8px 8px 0 0"
                                size="lg"
                                placeholder={t("form-input-username") as string}
                                onChange={handleUsernameChange}
                                value={username}
                                {...styles.input}
                              />
                              <CustomDivider
                                sx={{
                                  my: 0,
                                  opacity: 0.6,
                                }}
                              />
                              <Box position="relative">
                                <Input
                                  variant="outlined"
                                  size="lg"
                                  placeholder={
                                    t("form-input-password") as string
                                  }
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
                                  {!showPassword ? (
                                    <IoIosEye />
                                  ) : (
                                    <IoIosEyeOff />
                                  )}
                                </IconButton>
                              </Box>
                            </>
                          ) : signInMethod === "kraikubid" ? (
                            <>
                              <Input
                                variant="outlined"
                                size="lg"
                                placeholder={t("form-input-email") as string}
                                type="email"
                                onChange={handleEmailChange}
                                value={email}
                                {...styles.input}
                              />
                            </>
                          ) : null}
                        </Box>
                        <Box w="full" textAlign="end">
                          <Link href="/signup">
                            <a>
                              <Text
                                color="kraikub.green.500"
                                fontSize={14}
                                _hover={{ textDecoration: "underline" }}
                              >
                                {t("form-link-sign-up")}
                              </Text>
                            </a>
                          </Link>
                        </Box>
                        <VStack
                          spacing={2}
                          justifyContent="space-between"
                          w="full"
                        >
                          <Button
                            h="60px"
                            colorScheme="kraikub.green.always"
                            color="white"
                            type="submit"
                            w="full"
                            size="lg"
                            aria-label="sign-in-button"
                            isLoading={isSigninButtonLoading}
                            isDisabled={(!username || !password) && !email}
                          >
                            {t("form-btn-continue")}
                          </Button>
                          <Text fontSize={12} opacity={0.6} py={2}>
                            {t("form-btn-not-student")}
                          </Text>
                          <Button
                            h="60px"
                            size="lg"
                            w="full"
                            variant="outline"
                            borderColor="blackAlpha.300"
                            // {...styles.button}
                            textTransform="uppercase"
                            onClick={
                              signInMethod === "nontri"
                                ? changeToKraikubId
                                : changeToNontri
                            }
                          >
                            {signInMethod === "nontri"
                              ? t("form-btn-use-kraikubid")
                              : t("form-btn-use-nontri")}
                          </Button>
                        </VStack>
                      </Flex>
                    </form>
                  </Card>
                </SimpleFadeInLeft>
              </Box>
            )}
          </DynamicContainer>
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
                    colorScheme="kraikub.green.always"
                    rounded={6}
                    onClick={() =>
                      handleSigninEvent({ signin_method: "nontri" })
                    }
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
          <Button onClick={onClose} colorScheme="kraikub.green.always">
            {t("err-modal-btn-close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
