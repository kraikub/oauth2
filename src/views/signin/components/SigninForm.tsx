import {
  Container,
  Flex,
  Heading,
  HStack,
  Divider,
  Button,
  Box,
  Text,
  Center,
  Image,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  ButtonGroup,
  Stack,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import { MdPrivacyTip } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { authService } from "../../../services/authService";
import { Query } from "../../../types/query";
import { PrimaryInput } from "../PrimaryInput";
import { ScopeBadge } from "./ScopeBadge";
import anonymous from "../../../../public/anonymous.png";
interface SigninFormProps {
  query: Query;
  app: Application | null;
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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigninButtonLoading, setIsSigninLoading] = useState<boolean>(false);
  const styles = {
    anonymous: {
      body: {
        bg: "#000",
      },
      card: {
        bg: "#1b1c1c",
        color: "white",
      },
      dataControl: {
        bg: "#ffffff10",
      },
      highlight: {
        color: "katrade.400",
      },
      input: {
        backgroundColor: "#252526",
        placeholderColor: "#4b4d4f",
      },
      signinText: "เข้าสู่ระบบแบบไร้ตัวตน",
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
        backgroundColor: "#00000008",
        placeholderColor: "#b0b3b8",
      },
      signinText: "เข้าสู่ระบบ",
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

  const themeSelector = (styles: { regular: any; anonymous: any }) => {
    return query.scope === "0" ? styles.anonymous : styles.regular;
  };

  const validateBeforeSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        sdk,
      );
      if (onSigninComplete) {
        return onSigninComplete(data.payload.code);
      }
      return router.push(data.payload.url);
    } catch (error) {
      setIsSigninLoading(false);
      console.error(error);
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
        <Container maxW={500} minH="100vh" py="4%">
          {query.scope === "0" ? (
            <Center mb={4}>
              <Box p={2} bg="white" rounded="full">
                <Image src={anonymous.src} alt="data-icon" h="40px" />
              </Box>
            </Center>
          ) : null}

          <form onSubmit={validateBeforeSignin}>
            <Flex
              boxShadow={["none","0 6px 30px 20px #00000010"]}
              rounded={16}
              minH="60vh"
              h="auto"
              px="30px"
              py="40px"
              direction="column"
              alignItems="center"
              gap="20px"
              justifyContent="space-between !important"
              {...themeSelector(styles).card}
            >
              <Heading fontSize="22px" fontWeight={800} letterSpacing={-1}>
                เข้าสู่ระบบด้วย KU
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
                <Text fontSize={12} fontWeight={500}>
                  บัญชีผู้ใช้เครือข่ายนนทรี
                </Text>
                <PrimaryInput
                  placeholder="เช่น b621050XXXX"
                  onChange={handleUsernameChange}
                  value={username}
                  {...themeSelector(styles).input}
                />
                <Text fontSize={12} mt={5} fontWeight={500}>
                  รหัสผ่าน
                </Text>
                <PrimaryInput
                  placeholder="รหัสผ่าน"
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                  {...themeSelector(styles).input}
                />
              </Box>
              <Box
                px="20px"
                py="12px"
                rounded={10}
                w="full"
                {...themeSelector(styles).dataControl}
              >
                <HStack spacing={2}>
                  <Heading fontWeight={700} fontSize="14px">
                    ข้อมูลส่วนตัวของคุณ
                  </Heading>
                  <MdPrivacyTip size="20px" />
                </HStack>
                <Divider my="10px" />
                <Text fontSize={12} fontWeight={500}>
                  {query.scope === "0" ? (
                    `ข้อมูลส่วนบุคคลของคุณจะไม่ถูกแชร์ให้กับ ${app?.appName}`
                  ) : (
                    <>
                      <Box as="span" {...themeSelector(styles).highlight}>
                        {app?.appName}
                      </Box>{" "}
                      ต้องการเข้าถึงข้อมูลเหล่านี้
                    </>
                  )}
                </Text>
                {query.scope === "0" ? null : (
                  <Flex flexWrap="wrap" gap={3} my={4}>
                    <ScopeBadge>
                      <RiAccountCircleFill />
                      ชื่อ นามสกุล
                    </ScopeBadge>
                    <ScopeBadge>
                      <RiAccountCircleFill />
                      การศึกษา
                    </ScopeBadge>
                    {query.scope === "2" ? (
                      <ScopeBadge>
                        <RiAccountCircleFill />
                        ผลการเรียน
                      </ScopeBadge>
                    ) : null}
                  </Flex>
                )}
              </Box>
              <Button
                mt="5px"
                h="70px"
                w="full"
                colorScheme="katrade.scheme.fix"
                fontSize="1rem"
                fontWeight={700}
                rounded={6}
                isLoading={isSigninButtonLoading}
                _hover={{
                  boxShadow: "0 0 10px #00000030",
                }}
                type="submit"
              >
                {themeSelector(styles).signinText}
              </Button>
            </Flex>
          </form>
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
