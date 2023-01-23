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
  useColorModeValue,
} from "@chakra-ui/react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FieldContainer } from "./FieldContainer";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { appService } from "../../../../../services/appService";
import { useRouter } from "next/router";
import { useUser } from "../../../../../contexts/User";
import { noWhiteSpace } from "../../../../../utils/string";
import { ConnectSection } from "./ConnectSection";
import { Card } from "../../../../../components/Card";
import { useClientTranslation } from "../../../../../hooks/client-translation";
import { appFormComponentDict } from "../../../../../translate/appform";
import { useOnClient } from "../../../../../hooks/on-client";
import { p } from "../../../../../utils/path";

interface AppFormProps {
  app: Application;
}

export const AppForm: FC<AppFormProps> = ({ app }) => {
  const router = useRouter();
  const { t } = useClientTranslation(appFormComponentDict);
  const saveWindowBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const greenColor = useColorModeValue("kraikub.green.400", "kraikub.green.200");
  const ready = useOnClient();
  const { register, getValues, watch, reset, handleSubmit, control } = useForm({
    defaultValues: app,
  });
  const { fields, append, remove } = useFieldArray<Application>({
    control,
    name: "redirects",
  });
  const [hideSecret, setHideSecret] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const resetForm = () => {
    reset();
  };

  const handleDeleteApp = async () => {
    try {
      const response = await appService.deleteApplication(app.clientId);
      if (!response?.status) {
        // do something
      } else {
        return router.push(p.projects);
      }
    } catch (error) {
      alert("Operation fails");
    }
  };

  useEffect(() => {
    if (JSON.stringify(getValues()) !== JSON.stringify(app)) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [watch()]);

  if (!ready) {
    return null;
  }

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
      <Box position="relative" h="100px">
        <Container maxW="container.xl" py="40px">
          <HStack alignItems="center" spacing={8}>
            <Box
              w="60px"
              h="60px"
              bg="linear-gradient(121deg, rgba(0,111,79,1) 0%, rgba(0,74,106,1) 100%)"
              color="white"
              display={["none", "flex"]}
              justifyContent="center"
              alignItems="center"
              rounded={10}
            >
              <Heading size="lg">{app.appName[0].toUpperCase()}</Heading>
            </Box>
            <Box>
              <Heading
                size="lg"
                letterSpacing={1}
                mb={1}
                textTransform="uppercase"
              >
                {app.appName}
              </Heading>
              <Heading size="sm" opacity={0.7}>
                {app.appDescription}
              </Heading>
            </Box>
          </HStack>
        </Container>
      </Box>
      <Box my={14}>
        <ConnectSection app={app} />
      </Box>

      <Container maxW="container.xl" py="20px">
        <Card>
          <Text as="span" fontWeight={600} letterSpacing={1}>
            {t("section-redirect-header")}
          </Text>
          <Text my={4} fontSize={14} opacity={0.5} fontWeight={600}>
            {t("secion-redirtect-description")}
          </Text>
          {fields.map((item, index) => {
            return (
              <HStack key={item.id} justifyContent="space-between">
                <Input
                  defaultValue={item.url}
                  variant="unstyled"
                  fontWeight={600}
                  py={2}
                  borderWidth="0 0 2px 0"
                  size="md"
                  my={2}
                  rounded={0}
                  placeholder="https://mydomain.com/redirect/path"
                  _focus={{ borderColor: "kraikub.green.400" }}
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
              size="lg"
              variant="solid"
              colorScheme="kraikub.green"
              rounded="full"
              onClick={() =>
                append({
                  url: "",
                })
              }
            >
              <MdAdd /> {t("section-redirect-btn-add")}
            </Button>
          </Center>
        </Card>
      </Container>

      <Container maxW="container.xl" py="10vh">
        <Card>
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
            gap={4}
          >
            <GridItem colSpan={[12, 4]} rounded={20}>
              <Heading size="sm" mb={2} letterSpacing={1}>
                {t("section-info-header")}
              </Heading>
              <Text fontSize={16} opacity={0.8}>
                {t("section-info-description")}
              </Text>
            </GridItem>
            <GridItem colSpan={[12, 8]}>
              <FieldContainer title={t("app-name")}>
                <Input
                  variant="unstyled"
                  fontSize={22}
                  fontWeight={500}
                  py={2}
                  size="md"
                  my={2}
                  value={app.appName}
                  onChange={() => {}}
                  disabled
                />
              </FieldContainer>
              <FieldContainer title={t("app-creator")}>
                <Text fontSize={12} color="gray.600">
                  {t("editable")}
                </Text>
                <Input
                  variant="outline"
                  fontWeight={500}
                  py={2}
                  size="md"
                  my={2}
                  {...register("creatorName")}
                />
              </FieldContainer>
              <FieldContainer title={t("app-description")}>
                <Text fontSize={12} color="gray.600">
                  {t("editable")}
                </Text>
                <Textarea
                  my={2}
                  width="100%"
                  variant="outline"
                  fontSize={16}
                  fontWeight={500}
                  py={2}
                  size="md"
                  {...register("appDescription")}
                />
              </FieldContainer>
            </GridItem>
          </Grid>
        </Card>
      </Container>
      <Divider my={10} />
      <Container maxW="container.xl">
        <Card>
          <Flex justifyContent="space-between">
            {app.clientId === process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID ? (
              <>
                <Box>
                  <Heading size="md" mb={2}>
                    {t("section-danger-better-not-delete")}
                  </Heading>
                  <Text>
                    {t("section-danger-better-not-delete-description")}
                  </Text>
                </Box>
              </>
            ) : (
              <>
                <Box>
                  <Heading size="sm" mb={2} letterSpacing={1}>
                    {t("section-danger-delete-header")}
                  </Heading>
                  <Text opacity={0.6}>
                    {t("section-danger-delete-description")}
                  </Text>
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
              </>
            )}
          </Flex>
        </Card>
      </Container>
      <Box my={20}></Box>
      <Slide direction="bottom" in={hasChanged} style={{ zIndex: 10 }}>
        <Container my={4}>
          <Card
            props={{
              bg: saveWindowBg,
              backdropFilter: "blur(20px)",
            }}
          >
            <Flex gap="5" alignItems="center" justifyContent="space-between">
              <Text fontSize={14} fontWeight={500}>
                {t("toast-information-change")}
              </Text>
              <Spacer />
              <ButtonGroup>
                <Button onClick={resetForm}>{t("btn-undo")}</Button>
                <Button type="submit" colorScheme="kraikub.green" isLoading={isUpdating}>
                  {t("btn-save")}
                </Button>
              </ButtonGroup>
            </Flex>
          </Card>
        </Container>
      </Slide>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent rounded={16}>
          <ModalHeader py={4}>
            <Text fontWeight={600} fontSize={16}>
              {t("delete-popup-msg-1")}{" "}
              <Box as="span" fontWeight={700} color={greenColor}>
                {app.appName}
              </Box>{" "}
              {t("delete-popup-msg-2")}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={4}>
              <Text mb={3} fontSize={14}>
                {t("delete-popup-msg-3")}{" "}
                <Box as="span" fontWeight={500} color="red.500">
                  delete/{noWhiteSpace(app.appName)}
                </Box>{" "}
                {t("delete-popup-msg-4")}
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
              {t("delete-popup-btn-no")}
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={handleDeleteApp}
              disabled={
                deleteInputValue !== `delete/${noWhiteSpace(app.appName)}`
              }
            >
              {t("delete-popup-btn-yes")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};
