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
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FC,
  FormEvent,
  Fragment,
  useState,
} from "react";
import { authService } from "../../../services/authService";
import { PrimaryInput } from "../PrimaryInput";
import { ConsentForm } from "./ConsentForm";
import { SimpleFadeInLeft } from "../../../components/animations/SimpleFadeInLeft";
interface SigninFormProps {
  query: {
    client_id: string;
    state?: string | string[] | null;
    scope: string;
    dev?: string | string[] | null;
    secret?: string | string[] | null;
    redirect_uri: string;
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
        backgroundColor: "transparent",
        backgroundColorOnHover: "transparent",
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

  const bindStringToBoolean = (
    text?: string | string[] | null | undefined
  ): boolean | undefined => {
    if (text === "true") return true;
    else if (text === "false") return false;
    return undefined;
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

  const handleSigninEvent = async () => {
    if (app == null || query.scope === null) return;
    setIsSigninLoading(true);
    if (!username || !password) {
      setIsSigninLoading(false);
      return alert("Some field is missing.");
    }
    try {
      const { data } = await authService.signin(
        username,
        password,
        app.clientId,
        query.scope as string,
        query.state as string,
        bindStringToBoolean(query.dev),
        secret || (query.secret as string | undefined),
        query.redirect_uri as string,
        sdk
      );
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
        <Container maxW={500} minH="100vh" py="4%" {...styles.layout.container}>
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
                    <Box mt="30px" w="full">
                      <Text fontSize={14}>
                        {"คุณกำลังจะเข้าสู่ระบบกับแอป "}
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
                        placeholder="บัญชีผู้ใช้เครือข่ายนนทรี"
                        onChange={handleUsernameChange}
                        value={username}
                        {...themeSelector(styles).input}
                      />
                      <PrimaryInput
                        borderRadius="bottom"
                        placeholder="รหัสผ่าน"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                        {...themeSelector(styles).input}
                      />
                    </Box>

                    <Button
                      mt="5px"
                      h="70px"
                      w="full"
                      colorScheme="katrade.scheme.fix"
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
                    </Button>
                    {/* <IconButton
                      aria-label="sign-in-button"
                      color="#00000060"
                      rounded="full"
                      bgColor="transparent"
                      border="1px solid #00000030"
                      _hover={{
                        bgColor: "#00000010"
                      }}
                    >
                      <FaArrowRight color="inherit" />
                    </IconButton> */}
                  </Flex>
                </form>
              </SimpleFadeInLeft>
            </Box>
          )}
        </Container>
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
                  พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (Personal Data
                  Protection Act: PDPA)
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
                <Button {...styles.pdpaFontOverride} size="md" rounded={6}>
                  ฉันไม่ยอมรับ
                </Button>
                <Button
                  {...styles.pdpaFontOverride}
                  size="md"
                  colorScheme="katrade.scheme.fix"
                  rounded={6}
                  onClick={handleSigninEvent}
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
};
