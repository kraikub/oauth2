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
} from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";
import { FieldContainer } from "./FieldContainer";
import bg1 from "../../../../../../public/bg-1.png";
import { Application } from "../../../../../../db/schema/application";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AppFormProps {
  app: Application;
}

export const AppForm: FC<AppFormProps> = ({ app }) => {
  const { register, getValues, watch, reset } = useForm({
    defaultValues: app,
  });
  const [hideSecret, setHideSecret] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);

  const resetForm = () => {
    reset()
  }

  useEffect(() => {
    console.log(JSON.stringify(getValues()) !== JSON.stringify(app));
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

            <Button colorScheme="red" size="lg" onClick={resetForm} rounded={12}>
              Discard Changes
            </Button>
            <Button colorScheme="katrade.scheme.fix" size="lg" rounded={12}>Save</Button>
          </Container>
        </Box>
      </Slide>
    </FormControl>
  );
};
