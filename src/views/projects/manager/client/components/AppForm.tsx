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
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { FieldContainer } from "./FieldContainer";
import bg1 from "../../../../../../public/bg-1.png";
import bg3 from "../../../../../../public/bg-3.png";
import bg4 from "../../../../../../public/bg-4.png";
import bg5 from "../../../../../../public/bg-5.png";
import { Application } from "../../../../../../db/schema/application";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { appService } from "../../../../../services/appService";
import { useRouter } from "next/router";

interface AppFormProps {
  app: Application;
}

const kraikubUrl = "https://kraikub.com/signin";

export const AppForm: FC<AppFormProps> = ({ app }) => {
  const router = useRouter();
  const { register, getValues, watch, reset } = useForm({
    defaultValues: app,
  });
  const [devToolsScope, setDevToolsScope] = useState<number>(0);
  const [hideSecret, setHideSecret] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState<string>("");

  const resetForm = () => {
    reset();
  };

  const handleDeleteApp = async () => {
    const ac = localStorage.getItem("access");
    if (!ac) {
      return router.push("/projects/manager");
    }
    const response = await appService.deleteApplication(app.clientId, ac);
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
    <FormControl as="form" isRequired>
      <Box bgImage={`url(${bg1.src})`} bgSize="cover" bgPosition="center">
        <Container
          maxW="container.xl"
          h="200px"
          color="white"
          display="flex"
          alignItems="center"
        >
          <Box>
            <Heading fontWeight={700} fontSize="44px" letterSpacing="-2px">
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
              App Information
            </Heading>
            <Text fontSize={16} opacity={0.8}>
              These fields tell your users about what your application does.
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="App Name">
              <Input
                variant="unstyled"
                fontSize={22}
                fontWeight={700}
                color="gray.800"
                py={2}
                borderWidth="0 0 3px 0"
                size="md"
                my={2}
                rounded={0}
                _focus={{ borderColor: "katrade.500" }}
                value={app.appName}
                onChange={() => {}}
                disabled
              />
            </FieldContainer>
            <FieldContainer title="Creator Name">
              <Input
                variant="unstyled"
                fontSize={22}
                fontWeight={700}
                color="gray.800"
                py={2}
                borderWidth="0 0 3px 0"
                size="md"
                my={2}
                rounded={0}
                _focus={{ borderColor: "katrade.500" }}
                {...register("creatorName")}
              />
            </FieldContainer>
            <FieldContainer title="App Description">
              <Textarea
                my={2}
                width="100%"
                variant="unstyled"
                fontSize={16}
                fontWeight={700}
                color="gray.800"
                py={2}
                borderWidth="0 0 3px 0"
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
              Credentials
            </Heading>
            <Text fontSize={16} opacity={0.8}>
              This is your application identity. Do not let someone knows your
              application SECRET KEY!
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="Client ID Name">
              <HStack>
                <Input
                  variant="unstyled"
                  fontSize={16}
                  fontWeight={700}
                  color="gray.800"
                  py={2}
                  borderWidth="0 0 3px 0"
                  size="md"
                  my={2}
                  rounded={0}
                  _focus={{ borderColor: "katrade.500" }}
                  value={app?.clientId}
                  onChange={() => {}}
                  disabled
                />
                <IconButton aria-label="copy" rounded="full">
                  <FaCopy />
                </IconButton>
              </HStack>
            </FieldContainer>
            <FieldContainer title="Secret Key">
              <Collapse in={!hideSecret} animateOpacity>
                <HStack>
                  <Input
                    color="red.400"
                    variant="unstyled"
                    fontSize={16}
                    fontWeight={700}
                    py={2}
                    borderWidth="0 0 3px 0"
                    size="md"
                    my={2}
                    rounded={0}
                    _focus={{ borderColor: "katrade.500" }}
                    value={app?.secret}
                    onChange={() => {}}
                    disabled
                  />
                  <IconButton aria-label="copy" rounded="full">
                    <FaCopy />
                  </IconButton>
                </HStack>
              </Collapse>
              <ButtonGroup>
                <Button
                  rounded="full"
                  colorScheme="red"
                  size="md"
                  mt={2}
                  onClick={() => setHideSecret(!hideSecret)}
                >
                  {hideSecret ? "Reveal" : "Hide"}
                </Button>
                <Button
                  rounded="full"
                  colorScheme="teal"
                  size="md"
                  mt={2}
                  onClick={() => alert("not ready")}
                >
                  New Secret
                </Button>
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
              Callbacks
            </Heading>
            <Text fontSize={16} opacity={0.8}>
              These are how we send user{"'"}s data back to you via HTTP.
            </Text>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <FieldContainer title="Callback URL (Production)">
              <Input
                variant="unstyled"
                fontSize={16}
                fontWeight={700}
                py={2}
                borderWidth="0 0 3px 0"
                size="md"
                my={2}
                rounded={0}
                _focus={{ borderColor: "katrade.500" }}
                {...register("callbackUrl")}
              />
            </FieldContainer>
            <FieldContainer title="Callback URL (Development)">
              <Input
                variant="unstyled"
                fontSize={16}
                fontWeight={700}
                py={2}
                borderWidth="0 0 3px 0"
                size="md"
                my={2}
                rounded={0}
                _focus={{ borderColor: "katrade.500" }}
                {...register("devCallbackUrl")}
              />
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
          px={4}
          py={8}
          bgImage={bg5.src}
          bgSize="cover"
          bgPos="center"
        >
          <Heading size="md" mb={3}>
            Developer Tools
          </Heading>
          <Text>
            Instantly get your development resources from Kraikub here.
          </Text>
        </Box>
        <Box mt={4} p={4} bg="gray.100" rounded={10}>
          <Box mb={8}>
            <Heading size="md" mb={2}>
              Authentication URL Generator
            </Heading>
            <Divider />
          </Box>
          <Box my={4}>
            <Heading size="sm" mb={4}>
              Production URL
            </Heading>
            <Box px={5} py={3} bg="gray.300" rounded={10}>
              <Text fontWeight={700} color="#171633">
                {kraikubUrl +
                  `?client_id=${app.clientId}&scope=${devToolsScope}`}
              </Text>
            </Box>
          </Box>
          <Box my={4}>
            <Heading size="sm" mb={4}>
              Development URL
            </Heading>
            <Box px={5} py={3} bg="gray.300" rounded={10}>
              <Text fontWeight={700} color="#171633">
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
          px={4}
          py={8}
          bgImage={bg3.src}
          bgSize="cover"
          bgPos="center"
        >
          <Heading size="md" mb={3}>
            Danger Zone
          </Heading>
          <Text>
            These operations below make a hard changes to your application
            settings. Please make sure about what you are going to do.
          </Text>
        </Box>
        <Flex
          mt={4}
          p={4}
          bg="gray.100"
          rounded={10}
          justifyContent="space-between"
        >
          <Box>
            <Heading size="md" mb={2}>
              Delete this app
            </Heading>
            <Text>
              Permanently delete this app from Kraikub. Once you have deleted,
              your app cannot be recovered.
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
        </Flex>
      </Container>
      <Box my={20}></Box>
      <Slide direction="bottom" in={hasChanged} style={{ zIndex: 10 }}>
        <Box bg="white" boxShadow="0 -10px 10px #00000006">
          <Container
            maxW="container.xl"
            h="80px"
            gap="5"
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            <Spacer />

            <Button
              colorScheme="red"
              size="lg"
              onClick={resetForm}
              rounded={12}
            >
              Discard Changes
            </Button>
            <Button colorScheme="katrade.scheme.fix" size="lg" rounded={12}>
              Save
            </Button>
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
          <ModalHeader>Are you sure about this? 🤔</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              You are about to permanently delete{" "}
              <Box as="span" fontWeight={700} color="blue.500">
                {app.appName}
              </Box>{" "}
              from our platform. This operation cannot be reverted once it is
              executed.
            </Text>
            <Box my={4}>
              <Text mb={3}>
                Please type{" "}
                <Box as="span" fontWeight={700} color="red.500">
                  delete/{app.appName}
                </Box>{" "}
                to continue the progress.
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
              I changed my mind.
            </Button>
            <Button colorScheme="red" size="sm" onClick={handleDeleteApp} disabled={deleteInputValue !== `delete/${app.appName}`}>
              Delete it 🚀
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};
