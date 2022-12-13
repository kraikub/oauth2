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
import { FaTrash } from "react-icons/fa";
import { FieldContainer } from "./FieldContainer";
import bg1 from "../../../../../../public/bg-1b.png";
import bg3 from "../../../../../../public/bg-3.png";
import bg5 from "../../../../../../public/bg-5.png";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { appService } from "../../../../../services/appService";
import { useRouter } from "next/router";
import { useUser } from "../../../../../contexts/User";
import { noWhiteSpace } from "../../../../../utils/string";

interface AppFormProps {
  app: Application;
}

const kraikubUrl = "https://kraikub.com/signin";

export const AppForm: FC<AppFormProps> = ({ app }) => {
  const router = useRouter();
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
    try {
      const response = await appService.deleteApplication(app.clientId);
      if (!response?.status) {
        // do something
      } else {
        return router.push("/projects/manager");
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
      <Box
        bg="linear-gradient(121deg, rgba(0,111,79,1) 0%, rgba(0,74,106,1) 100%)"
        position="relative"
        h="400px"
      >
        <Container
          maxW="container.xl"
          height="full"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Box textAlign="center">
            <Heading
              fontWeight={600}
              fontSize={["28px", "40px", "50px"]}
              mb={2}
              letterSpacing="-1px"
            >
              {app?.appName}
            </Heading>
            <Heading fontWeight={600} fontSize="20px" opacity={0.8}>
              {app?.appDescription}
            </Heading>
          </Box>
          <Box
            position="absolute"
            bottom="20px"
            left={0}
            right={0}
            textAlign="center"
          >
            <Text fontWeight={500} opacity={0.8}>
              By {app.creatorName}
            </Text>
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
            bgColor="gray.100"
            rounded={20}
            px={5}
            py={8}
            color="black"
          >
            <Heading size="md" mb={4}>
              App Information
            </Heading>
            <Divider borderColor="gray.300" my="20px" />
            <Text fontSize={16} opacity={0.8}>
              {"Your app's general information"}
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="App name">
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
            <FieldContainer title="Creator">
              <Text fontSize={12} color="gray.600">
                Editable
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
            <FieldContainer title="Description">
              <Text fontSize={12} color="gray.600">
                Editable
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
            bgColor="gray.100"
            rounded={20}
            px={5}
            py={8}
            color="black"
            w="full"
          >
            <Heading size="md" mb={4}>
              Credentials
            </Heading>
            <Divider borderColor="gray.300" my="20px" />
            <Text fontSize={16} opacity={0.8}>
              Your app identity and some important keys and credentials.
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
                  {hideSecret ? "SHOW" : "HIDE"}
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
            bgColor="gray.100"
            rounded={20}
            px={5}
            py={8}
            color="black"
          >
            <Heading size="md" mb={4}>
              Redirects
            </Heading>
            <Divider borderColor="gray.300" my="20px" />
            <Text fontSize={16} opacity={0.8}>
              URL for redirecting an authorization responses when your users
              sign in to your application with <strong>SIGN IN WITH KU.</strong>
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="Redirect URLs">
              <Text my={4} fontSize={12}>
                Kraikub will only allow any authentication to be redirected to
                these URLs. Please make sure that you have owned these URLs. We
                are not recommended you to use a non-HTTPS URLs.
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
                  <MdAdd /> Add an URL
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
          <Text>Speed up your development time.</Text>
        </Box>
        <Box
          mt={4}
          p={8}
          bg="white"
          boxShadow="0 2px 5px 2px #00000020"
          rounded={10}
        >
          <Text>Temporary Unavailable</Text>
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
            Danger Zone
          </Heading>
          <Text>
            These operations will create a serious effects to your application.
          </Text>
          <Text fontWeight={600} mt={4}>
            {'"With great power comes great responsibility" - Uncle Ben'}
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
          {app.clientId === process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID ? (
            <>
              <Box>
                <Heading size="md" mb={2}>
                  You better not delete this
                </Heading>
                <Text>
                  Sorry, but god said this application should be existed.
                </Text>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Heading size="md" mb={2}>
                  Delete this app
                </Heading>
                <Text>
                  Permanently delete this application from Kraikub service.
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
            <Text fontSize={14} fontWeight={500}>
              Some information have been changed
            </Text>
            <Spacer />
            <ButtonGroup>
              <Button colorScheme="red" onClick={resetForm} rounded={12}>
                Undo
              </Button>
              <Button
                type="submit"
                colorScheme="katrade"
                rounded={12}
                isLoading={isUpdating}
              >
                Save
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
          <ModalHeader py={4}>
            <Text fontWeight={600} fontSize={16}>
              Permanently delete{" "}
              <Box as="span" fontWeight={700} color="green.600">
                {app.appName}
              </Box>{" "}
              from Kraikub?
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={4}>
              <Text mb={3} fontSize={14}>
                Type{" "}
                <Box as="span" fontWeight={500} color="red.500">
                  delete/{noWhiteSpace(app.appName)}
                </Box>{" "}
                To continue the deletion.
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
              Nope, I changed my mind.
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={handleDeleteApp}
              disabled={
                deleteInputValue !== `delete/${noWhiteSpace(app.appName)}`
              }
            >
              Delete 🚀
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};
