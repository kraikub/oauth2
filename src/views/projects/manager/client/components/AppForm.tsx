import {
  Box,
  FormControl,
  Container,
  Heading,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
  Divider,
  HStack,
  IconButton,
  Collapse,
  ButtonGroup,
  Button,
  Spacer,
  Slide,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  Stack,
  RadioGroup,
  Center,
} from "@chakra-ui/react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaCopy, FaTrash } from "react-icons/fa";
import { FieldContainer } from "./FieldContainer";
import bg1 from "../../../../../../public/bg-1.png";
import bg3 from "../../../../../../public/bg-3.png";
import bg5 from "../../../../../../public/bg-5.png";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { appService } from "../../../../../services/appService";
import { useRouter } from "next/router";
import { useUser } from "../../../../../contexts/User";
import { noWhiteSpace } from "../../../../../utils/string";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Choice } from "./Choice";

interface AppFormProps {
  app: Application;
}

const kraikubUrl = "https://kraikub.com/signin";

export const AppForm: FC<AppFormProps> = ({ app }) => {
  const router = useRouter();
  const { reload } = useUser();
  const { register, getValues, watch, reset, handleSubmit, control } = useForm({
    defaultValues: app,
  });
  const { fields, append, remove } = useFieldArray<Application>({
    control,
    name: "redirects",
  });
  const [devToolsScope, setDevToolsScope] = useState<string>("1");
  const [hideSecret, setHideSecret] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const resetForm = () => {
    reset();
  };

  const handleDeleteApp = async () => {
    const response = await appService.deleteApplication(app.clientId);
    if (!response?.status) {
      // do something
    } else {
      return router.push("/projects/manager");
    }
  };

  useEffect(() => {
    if (JSON.stringify(getValues()) !== JSON.stringify(app)) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [watch()]);

  return (
    <FormControl
      as="form"
      isRequired
      onSubmit={handleSubmit(async (data) => {
        setIsUpdating(true);
        const res = await appService.updateAppplcation(app.clientId, data);
        setIsUpdating(false);
        router.reload();
      })}
    >
      <Box bgImage={`url(${bg1.src})`} bgSize="cover" bgPosition="center">
        <Container
          maxW="container.xl"
          h="200px"
          color="white"
          display="flex"
          alignItems="center"
        >
          <Box>
            <Heading fontWeight={500} fontSize="44px" letterSpacing="-2px">
              {app?.appName}
            </Heading>
            <Heading fontWeight={600} fontSize="20px" opacity={0.6}>
              {app?.appDescription}
            </Heading>
          </Box>
        </Container>
      </Box>

      <Container maxW="container.xl" py="10vh">
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
          gap={4}
        >
          <GridItem
            colSpan={[12, 4]}
            bgImage={bg1.src}
            rounded={20}
            px={5}
            py={8}
            color="white"
          >
            <Heading size="md" mb={4}>
              ข้อมูลแอปพลิเคชัน
            </Heading>
            <Text fontSize={16} opacity={0.8}>
              ข้อมูลโดยทั่วไปเกี่ยวกับแอปพลิเคชันของคุณ
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="ชื่อแอปพลิเคชั่น">
              <Input
                variant="unstyled"
                fontSize={22}
                fontWeight={500}
                color="gray.800"
                py={2}
                borderWidth="0 0 1px 0"
                size="md"
                my={2}
                rounded={0}
                _focus={{ borderColor: "katrade.500" }}
                value={app.appName}
                onChange={() => {}}
                disabled
              />
            </FieldContainer>
            <FieldContainer title="ผู้สร้าง">
              <Text fontSize={12} color="gray.600">
                สามารถแก้ไขได้
              </Text>
              <Input
                variant="unstyled"
                fontSize={22}
                fontWeight={500}
                color="gray.800"
                py={2}
                borderWidth="0 0 1px 0"
                size="md"
                my={2}
                rounded={0}
                _focus={{ borderColor: "katrade.500" }}
                {...register("creatorName")}
              />
            </FieldContainer>
            <FieldContainer title="เกี่ยวกับแอปพลิเคชัน">
              <Text fontSize={12} color="gray.600">
                สามารถแก้ไขได้
              </Text>
              <Textarea
                my={2}
                width="100%"
                variant="unstyled"
                fontSize={16}
                fontWeight={500}
                color="gray.800"
                py={2}
                borderWidth="0 0 1px 0"
                size="md"
                rounded={0}
                _focus={{ borderColor: "katrade.500" }}
                {...register("appDescription")}
              />
            </FieldContainer>
          </GridItem>
        </Grid>
        <Divider my={10} />
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
          gap={4}
        >
          <GridItem
            colSpan={[12, 4]}
            bgImage={bg1.src}
            rounded={20}
            px={5}
            py={8}
            color="white"
            w="full"
          >
            <Heading size="md" mb={4}>
              ข้อมูลสำคัญ
            </Heading>
            <Text fontSize={16} opacity={0.8}>
              ข้อมูลเกี่ยวกับการยืนยันตัวตนของแอปพลิเคชันคุณรวมถึงเป็นรหัสสำหรับใช้งาน
              Kraikub ดังนั้นห้ามให้ใครเห็น secret ของคุณ!
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="Client ID">
              <HStack>
                <Input
                  variant="unstyled"
                  fontSize={16}
                  fontWeight={500}
                  color="gray.800"
                  py={2}
                  borderWidth="0 0 1px 0"
                  size="md"
                  my={2}
                  rounded={0}
                  _focus={{ borderColor: "katrade.500" }}
                  value={app?.clientId}
                  onChange={() => {}}
                  disabled
                />
                {/* <IconButton aria-label="copy" rounded="full">
                  <FaCopy />
                </IconButton> */}
              </HStack>
            </FieldContainer>
            <FieldContainer title="Secret Key">
              <Collapse in={!hideSecret} animateOpacity>
                <HStack>
                  <Input
                    color="red.400"
                    variant="unstyled"
                    fontSize={16}
                    fontWeight={500}
                    py={2}
                    borderWidth="0 0 1px 0"
                    size="md"
                    my={2}
                    rounded={0}
                    _focus={{ borderColor: "katrade.500" }}
                    value={app?.secret}
                    onChange={() => {}}
                    disabled
                  />
                  {/* <IconButton aria-label="copy" rounded="full">
                    <FaCopy />
                  </IconButton> */}
                </HStack>
              </Collapse>
              <ButtonGroup>
                <Button
                  rounded={6}
                  colorScheme="red"
                  size="sm"
                  mt={2}
                  onClick={() => setHideSecret(!hideSecret)}
                >
                  {hideSecret ? "แสดง" : "ซ่อน"}
                </Button>
                {/* <Button
                  rounded="full"
                  colorScheme="teal"
                  size="md"
                  mt={2}
                  onClick={() => alert("not ready")}
                >
                  New Secret
                </Button> */}
              </ButtonGroup>
            </FieldContainer>
          </GridItem>
        </Grid>
        <Divider my={10} />
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
          gap={4}
        >
          <GridItem
            colSpan={[12, 4]}
            bgImage={bg1.src}
            rounded={20}
            px={5}
            py={8}
            color="white"
          >
            <Heading size="md" mb={4}>
              Redirects (optional)
            </Heading>
            <Text fontSize={16} opacity={0.8}>
              ใช้สำหรับกรณีที่ต้องการให้ Kraikub ส่งข้อมูลกลับไปที่ URL ของคุณ
              ไม่จำเป็นต้องกรอกหากคุณใช้ Kraikub SDK
              ในการพัฒนาแอปพลิเคชั่นของคุณ
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="Redirect URLs">
              <Text my={4} fontSize={12}>
                Kraikub จะอนุญาติให้ส่งข้อมูลการเข้าสู่ระบบกลับไปที่ URL
                เหล่านี้เท่านั้น, หากต้องการใช้ URL ที่ไม่เป็น HTTPs
                คุณจำเป็นต้องแนบ Secret มาด้วยทุกครั้ง
              </Text>
              {fields.map((item, index) => {
                return (
                  <HStack key={item.id} justifyContent="space-between">
                    <Input
                      defaultValue={item.url}
                      variant="unstyled"
                      fontSize={14}
                      fontWeight={500}
                      py={2}
                      borderWidth="0 0 1px 0"
                      size="md"
                      my={2}
                      rounded={0}
                      placeholder="เช่น https://mydomain.com/redirect"
                      _focus={{ borderColor: "katrade.500" }}
                      {...register(`redirects.${index}.url`)}
                    />
                    <ButtonGroup>
                      <IconButton
                        aria-label="delete"
                        size="sm"
                        colorScheme="red"
                        rounded="full"
                        variant="ghost"
                      >
                        <FaTrash onClick={() => remove(index)} />
                      </IconButton>
                    </ButtonGroup>
                  </HStack>
                );
              })}
              <Center mt={3}>
                <Button
                  aria-label="append-url"
                  gap={2}
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    append({
                      url: "",
                    })
                  }
                >
                  <MdAdd /> เพิ่ม URL
                </Button>
              </Center>
            </FieldContainer>
          </GridItem>
        </Grid>
      </Container>
      <Divider my={10} />
      <Container maxW="container.xl">
        <Box
          minH="100px"
          bg="red.400"
          rounded={16}
          color="white"
          p={8}
          py={8}
          bgImage={bg5.src}
          bgSize="cover"
          bgPos="center"
        >
          <Heading size="md" mb={3}>
            Shortcuts
          </Heading>
          <Text>
            เครื่องมือเหล่านี้จะช่วยให้คุณพัฒนาแอปพลิเคชันได้รวดเร็วยิ่งขึ้น
          </Text>
        </Box>
        <Box
          mt={4}
          p={8}
          bg="white"
          boxShadow="0 2px 5px 2px #00000020"
          rounded={10}
        >
          <Box mb={8}>
            <Heading size="md" mb={2}>
              SDK
            </Heading>
            <Divider />
          </Box>
          <Box my={4}>
            <Box py={3} mb={10} bg="white" rounded={8}>
              <Heading size="sm">เลือกประเภทการเข้าสู่ระบบ</Heading>
              <Stack my={6} spacing={4}>
                <Choice
                  set={setDevToolsScope}
                  value="0"
                  currentValue={devToolsScope}
                  title={"Anonymous Sign in"}
                  description={
                    "เมื่อผู้ใช้งานของคุณเข้าสู่ระบบ, Kraikub จะไม่ส่งข้อมูลส่วนบุคคลของผู้ใช้งานกลับไปให้คุณ ยกเว้น ID สำหรับใช้ระบุตัวตนของผู้ใช้งาน"
                  }
                />
                <Choice
                  set={setDevToolsScope}
                  value="1"
                  currentValue={devToolsScope}
                  title={"Sign in with KU"}
                  description={
                    "เมื่อผู้ใช้งานของคุณเข้าสู่ระบบ, Kraikub จะให้ข้อมูลทั่วไปเกี่ยวกับนิสิต/นักศึกษา เช่นชื่อ หรือ คณะที่เรียน"
                  }
                />
                <Choice
                  set={setDevToolsScope}
                  value="2"
                  currentValue={devToolsScope}
                  title={"Sign in with KU Plus"}
                  description={
                    "เมื่อผู้ใช้งานของคุณเข้าสู่ระบบ, Kraikub จะให้ข้อมูลทั่วไปและข้อมูลเชิงลึกเกี่ยวกับนิสิต/นักศึกษา เช่น ผลการเรียน"
                  }
                />
              </Stack>
            </Box>
            <SyntaxHighlighter
              language="javascript"
              style={materialOceanic}
              showLineNumbers
              customStyle={{
                borderRadius: "10px",
                backgroundColor: "#2c3036",
              }}
            >
              {`const app = createInstance({\n\tclientId: "${app.clientId}",\n\tsecret: "${app.secret}"\n})`}
            </SyntaxHighlighter>
          </Box>
        </Box>
        <Box
          mt={4}
          p={8}
          bg="white"
          boxShadow="0 2px 5px 2px #00000020"
          rounded={10}
        >
          <Box mb={8}>
            <Heading size="md" mb={2}>
              URL สำหรับใช้งาน Sign in with KU ด้วย Callback
            </Heading>
            <Divider />
          </Box>
          <Box my={4}>
            <Text my={4}>
              ไม่จำเป็นต้องใช้ URL เหล่านี้ในการณีที่คุณใช้ Kraikub SDK
            </Text>
            <Box py={3} mb={10} bg="white" rounded={8}>
              <Heading size="sm">เลือกประเภทการเข้าสู่ระบบ</Heading>
              <Stack my={6} spacing={4}>
                <Choice
                  set={setDevToolsScope}
                  value="0"
                  currentValue={devToolsScope}
                  title={"Anonymous Sign in"}
                  description={
                    "เมื่อผู้ใช้งานของคุณเข้าสู่ระบบ, Kraikub จะไม่ส่งข้อมูลส่วนบุคคลของผู้ใช้งานกลับไปให้คุณ ยกเว้น ID สำหรับใช้ระบุตัวตนของผู้ใช้งาน"
                  }
                />
                <Choice
                  set={setDevToolsScope}
                  value="1"
                  currentValue={devToolsScope}
                  title={"Sign in with KU"}
                  description={
                    "เมื่อผู้ใช้งานของคุณเข้าสู่ระบบ, Kraikub จะให้ข้อมูลทั่วไปเกี่ยวกับนิสิต/นักศึกษา เช่นชื่อ หรือ คณะที่เรียน"
                  }
                />
                <Choice
                  set={setDevToolsScope}
                  value="2"
                  currentValue={devToolsScope}
                  title={"Sign in with KU Plus"}
                  description={
                    "เมื่อผู้ใช้งานของคุณเข้าสู่ระบบ, Kraikub จะให้ข้อมูลทั่วไปและข้อมูลเชิงลึกเกี่ยวกับนิสิต/นักศึกษา เช่น ผลการเรียน"
                  }
                />
              </Stack>
            </Box>
            <Heading size="sm" mb={4}>
              สำหรับส่งกลับไปที่ Production URL
            </Heading>
            <Box px={5} py={3} bg="gray.500" rounded={6}>
              <Text
                fontWeight={400}
                fontSize={14}
                color="gray.300"
                fontFamily="'Roboto Mono'"
              >
                {kraikubUrl +
                  `?client_id=${app.clientId}&scope=${devToolsScope}`}
              </Text>
            </Box>
          </Box>
          <Box my={4}>
            <Heading size="sm" mb={4}>
              สำหรับส่งกลับไปที่ Development URL
            </Heading>
            <Box px={5} py={3} bg="gray.500" rounded={6}>
              <Text
                fontWeight={400}
                fontSize={14}
                color="gray.300"
                fontFamily="'Roboto Mono'"
              >
                {kraikubUrl +
                  `?client_id=${app.clientId}&scope=${devToolsScope}&dev=true&secret=${app.secret}`}
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider my={10} />
      <Container maxW="container.xl">
        <Box
          minH="100px"
          bg="red.400"
          rounded={16}
          color="white"
          p={8}
          py={8}
          bgImage={bg3.src}
          bgSize="cover"
          bgPos="center"
        >
          <Heading size="md" mb={3}>
            โซนอันตราย
          </Heading>
          <Text>
            การตั้งค่าเหล่านี้อาจมีผลกระทบกับแอปพลิเคชั่นของคุณ
            โปรดตรวจสอบความถูกต้องก่อนกระทำการใดๆในโซนนี้
          </Text>
        </Box>
        <Flex
          mt={4}
          p={8}
          bg="white"
          boxShadow="0 2px 5px 2px #00000020"
          rounded={10}
          justifyContent="space-between"
        >
          <Box>
            <Heading size="md" mb={2}>
              ลบแอปพลิเคชันนี้
            </Heading>
            <Text>ลบแอปพลิเคชั่นนี้ออกจากแพลทฟอร์มอย่างถาวร</Text>
          </Box>
          <IconButton
            aria-label="delete-app"
            rounded="full"
            bg="red.500"
            onClick={() => setIsDeleteModalOpen(true)}
            _hover={{
              bg: undefined,
              transform: "scale(1.1)",
            }}
          >
            <MdDelete size="22px" color="#fff" />
          </IconButton>
        </Flex>
      </Container>
      <Box my={20}></Box>
      <Slide direction="bottom" in={hasChanged} style={{ zIndex: 10 }}>
        <Box bg="white" boxShadow="0 -10px 10px #00000010">
          <Container
            maxW="container.xl"
            h="80px"
            gap="5"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize={14}>แอปมีการเปลี่ยนแปลง</Text>
            <Spacer />
            <ButtonGroup>
              <Button colorScheme="red" onClick={resetForm} rounded={12}>
                ยกเลิก
              </Button>
              <Button
                type="submit"
                colorScheme="katrade.scheme.fix"
                rounded={12}
                isLoading={isUpdating}
              >
                บันทึก
              </Button>
            </ButtonGroup>
          </Container>
        </Box>
      </Slide>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent rounded={16}>
          <ModalHeader>คุณต้องการลบแอปพลิเคชั่นนี้จริงหรือ? 🤔</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              คุณกำลังที่จะลบแอปพลิเคชั่น{" "}
              <Box as="span" fontWeight={500} color="blue.500">
                {app.appName}
              </Box>{" "}
              ออกจากแพลทฟอร์มของเรา
              การกระทำครั้งนี้ไม่สามาถที่จะแก้ไขหรือย้อนกลับในภายหลังได้
            </Text>
            <Box my={4}>
              <Text mb={3}>
                กรุณากรอก{" "}
                <Box as="span" fontWeight={500} color="red.500">
                  delete/{noWhiteSpace(app.appName)}
                </Box>{" "}
                เพื่อดำเนินการลบแอปพลิเคชั่น
              </Text>
              <Input
                rounded={6}
                size="sm"
                value={deleteInputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDeleteInputValue(e.target.value)
                }
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={() => setIsDeleteModalOpen(false)}
              size="sm"
            >
              ไม่ ฉันเปลี่ยนใจแล้ว
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={handleDeleteApp}
              disabled={
                deleteInputValue !== `delete/${noWhiteSpace(app.appName)}`
              }
            >
              ลบเดี๋ยวนี้ 🚀
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};
