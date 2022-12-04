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
} from "@chakra-ui/react";
import * as crypto from "crypto";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FC,
  FormEvent,
  Fragment,
  useEffect,
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

export const SigninForm: FC<SigninFormProps> = ({
  query,
  app,
  onSigninComplete,
  secret,
  sdk,
}) => {
  const router = useRouter();
  const [pdpaPopup, setPdpaPopup] = useState<boolean>(false);
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigninButtonLoading, setIsSigninLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<FullUserData | null>();

  const styles = {
    layout: {
      container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    regular: {
      body: {
        bg: "#fff",
      },
      card: {
        bg: "#fff",
        color: "black",
      },
      dataControl: {
        bg: "#00000008",
      },
      highlight: {
        color: "katrade.600",
      },
      input: {
        backgroundColor: "#F7FAFC",
        backgroundColorOnHover: "#EDF2F7",
        borderColor: "#CBD5E0",
        placeholderColor: "#b0b3b8",
      },
      signinText: "ดำเนินการต่อ",
    },
    pdpaFontOverride: {
      fontFamily: `'Manrope','Sarabun', sans-serif !important`,
    },
  };
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const themeSelector = (styles: { regular: any }) => {
    return query.scope === "0" ? styles.regular : styles.regular;
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
      if (onSigninComplete) {
        return onSigninComplete(data.payload.code);
      }
      return router.push(data.payload.url);
    } catch (error) {
      setIsSigninLoading(false);
      console.error(error);
      setPdpaPopup(false);
      backToSigninForm();
      alert("Sign in failed, please try again.");
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

  useEffect(() => {
    checkActiveUser();
  }, []);

  if (activeUser === undefined) {
    return null;
  } else if (activeUser === null) {
    return (
      <Fragment>
        <Head>
          <title>Signin with KU</title>
          <meta property="og:title" content={`Katrade - Sign in with KU`} />
          <meta
            property="og:description"
            content={`Sign in to ${app?.appName} with your Kasetsart Account.`}
          />
        </Head>
        <Box {...themeSelector(styles).body}>
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
                      {...themeSelector(styles).card}
                    >
                      <Heading size="lg" letterSpacing="-1.5px" lang="en">
                        Sign in
                      </Heading>
                      <Text>Login with KU Account</Text>
                      <Box mt="30px" w="full">
                        <Text fontSize={14}>
                          {"You are logging in to "}
                          <Box
                            as="span"
                            fontWeight={700}
                            {...themeSelector(styles).highlight}
                          >
                            {app?.appName}
                          </Box>
                        </Text>
                      </Box>
                      <Box mt="10px" w="full">
                        <Progress
                          size="xs"
                          isIndeterminate
                          colorScheme="green"
                          background="transparent"
                          opacity={isSigninButtonLoading ? 1 : 0}
                        />
                        <PrimaryInput
                          borderRadius="top"
                          borderWidth="bottom"
                          placeholder="Nontri Account"
                          onChange={handleUsernameChange}
                          value={username}
                          {...themeSelector(styles).input}
                        />
                        <Box position="relative">
                          <PrimaryInput
                            borderRadius="bottom"
                            borderWidth="top"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            onChange={handlePasswordChange}
                            value={password}
                            {...themeSelector(styles).input}
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

                      {/* <Button
                        mt="5px"
                        h="70px"
                        w="full"
                        colorScheme="katrade"
                        fontSize="1rem"
                        fontWeight={700}
                        _hover={{
                          boxShadow: "0 0 10px #00000030",
                        }}
                        isLoading={isSigninButtonLoading}
                        type="submit"
                        disabled={!username || !password}
                      >
                        {themeSelector(styles).signinText}
                      </Button> */}
                      <IconButton
                        isLoading={isSigninButtonLoading}
                        type="submit"
                        disabled={!username || !password}
                        aria-label="sign-in-button"
                        // color="#00000060"
                        rounded="full"
                        colorScheme="katrade"
                        // border="1px solid #00000030"
                        _hover={{
                          bgColor: "#000000",
                        }}
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
          <DrawerOverlay />
          <DrawerContent
            position="relative"
            minH="82vh"
            maxH="96vh"
            py={14}
            borderRadius="20px 20px 0 0"
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
                <Stack {...styles.pdpaFontOverride} spacing={10}>
                  <Heading size="md" {...styles.pdpaFontOverride}>
                    นโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)
                  </Heading>
                  <Text>
                    PDPA คือ พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
                    ซึ่งเป็นกฎหมายที่ถูกสร้างมาเพื่อป้องกันการละเมิดข้อมูลส่วนบุคคลของทุกคน
                    รวมถึงการจัดเก็บข้อมูลและนำไปใช้โดยไม่ได้แจ้งให้ทราบ
                    และไม่ได้รับความยินยอมจากเจ้าของข้อมูลเสียก่อน
                  </Text>
                  <Text>
                    พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (Personal
                    Data Protection Act: PDPA)
                    คือกฎหมายใหม่ที่ออกมาเพื่อแก้ไขปัญหาการถูกล่วงละเมิดข้อมูลส่วนบุคคลที่เพิ่มมากขึ้นเรื่อย
                    ๆ ในปัจจุบัน เช่น
                    การซื้อขายข้อมูลเบอร์โทรศัพท์และข้อมูลส่วนตัวอื่น ๆ
                    โดยที่เจ้าของข้อมูลไม่ยินยอม
                    ที่มักพบได้มากในรูปแบบการโทรมาโฆษณา หรือล่อลวง{" - "}
                    <Link
                      href="https://pdpa.pro/blogs/in-summary-what-is-pdpa"
                      color="blue.600"
                    >
                      แหล่งที่มา
                    </Link>
                  </Text>
                  <Text>
                    Kraikub
                    ได้เห็นถึงความสำคัญของข้อมูลส่วนบุคคลของผู้ใช้งานทุกท่านจึงได้จัดทำ
                    นโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)
                    เพื่อแจ้งให้ผู้ใช้งานทราบก่อนเริ่มใช้บริการต่างจาก Kraikub
                    โดยมีเนื้อหาดังนี้
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sapiente laboriosam laborum iusto aliquam, impedit rem ea
                    quod! Corrupti aliquam laborum, delectus, vero adipisci modi
                    aspernatur ducimus velit voluptates, voluptas natus!
                  </Text>
                </Stack>
              </Container>
            </DrawerBody>
            <DrawerFooter>
              <Container maxW="container.lg">
                <ButtonGroup>
                  <Button
                    {...styles.pdpaFontOverride}
                    size="md"
                    rounded={6}
                    onClick={backToSigninForm}
                  >
                    ฉันไม่ยอมรับ
                  </Button>
                  <Button
                    {...styles.pdpaFontOverride}
                    size="md"
                    colorScheme="katrade"
                    rounded={6}
                    onClick={() => handleSigninEvent()}
                    isLoading={isSigninButtonLoading}
                  >
                    ฉันยอมรับ
                  </Button>
                </ButtonGroup>
              </Container>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Fragment>
    );
  }

  else {
    return <UserSelector user={activeUser} reject={() => setActiveUser(null)} handleSignin={handleSigninEvent} loading={isSigninButtonLoading}/>
  }
};
