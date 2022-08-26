import { FC, useEffect, useState } from "react";
import Navbar from "../../../../layouts/Navbar";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";
import { Application } from "../../../../../db/schema/application";
import bg1 from "../../../../../public/bg-1.png";
import { useRouter } from "next/router";
import { appService } from "../../../../services/appService";
interface ClientPageProps {}

const ClientPage: FC<ClientPageProps> = ({}) => {
  const router = useRouter();
  const { clientId } = router.query;
  const [app, setApp] = useState<Application>();
  const [isFetched, setIsFetched] = useState(false);
  const [hideSecret, setHideSecret] = useState(true);

  const getApp = async () => {
    if (!clientId) return;
    const ac = localStorage.getItem("access");
    if (!ac) return; //
    try {
      const res = await appService.getApplication(clientId as string, ac);
      console.log(res)
      if (res) {
        setApp(res);
      }
      setIsFetched(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!clientId) return;
    getApp();
  }, [clientId]);

  return (
    <>
      <Navbar />
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
          <GridItem colSpan={{ md: 4 }}>
            <Text fontWeight={700} fontSize="18px">
              App Information
            </Text>
          </GridItem>
          <GridItem colSpan={{ md: 8 }}>
            <Text fontWeight={500} fontSize="16px">
              App Name
            </Text>
            <Input size="md" my={2} value={app?.appName} onChange={() => {}} />
            <Text fontWeight={500} fontSize="16px">
              Creator Name
            </Text>
            <Input
              size="md"
              my={2}
              value={app?.creatorName}
              onChange={() => {}}
            />
            <Text fontWeight={500} fontSize="16px">
              App Description
            </Text>
            <Textarea
              my={2}
              width="100%"
              value={app?.appDescription}
              onChange={() => {}}
            />
          </GridItem>
        </Grid>
        <Divider my={10} />
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
          gap={4}
        >
          <GridItem colSpan={4}>
            <Text fontWeight={700} fontSize="18px">
              Credentials
            </Text>
          </GridItem>
          <GridItem colSpan={8}>
            <Text fontWeight={500} fontSize="16px">
              Client ID
            </Text>
            <HStack>
              <Input
                color="#4E2CDA"
                my={2}
                value={app?.clientId}
                onChange={() => {}}
              ></Input>
              <IconButton aria-label="copy" rounded="full">
                <FaCopy />
              </IconButton>
            </HStack>
            <Text fontWeight={500} fontSize="16px">
              Secret
            </Text>
            <Collapse in={!hideSecret} animateOpacity>
              <HStack>
                <Input
                  color="#4E2CDA"
                  my={2}
                  value={app?.secret}
                  onChange={() => {}}
                ></Input>
                <IconButton aria-label="copy" rounded="full">
                  <FaCopy />
                </IconButton>
              </HStack>
            </Collapse>
            <ButtonGroup>
              <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                mt={2}
                onClick={() => setHideSecret(!hideSecret)}
              >
                {hideSecret ? "Reveal" : "Hide"}
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                mt={2}
                onClick={() => alert("not ready")}
              >
                New Secret
              </Button>
            </ButtonGroup>
          </GridItem>
        </Grid>
        <Divider my={10} />
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
          gap={4}
        >
          <GridItem colSpan={4}>
            <Text fontWeight={700} fontSize="18px">
              Callback
            </Text>
          </GridItem>
          <GridItem colSpan={8}>
            <Text fontWeight={500} fontSize="16px">
              Callback URL (production)
            </Text>
            <Input
              size="sm"
              my={2}
              value={app?.callbackUrl}
              onChange={() => {}}
            />
            <Text fontWeight={500} fontSize="16px">
              Callback URL (development)
            </Text>
            <Input
              size="sm"
              my={2}
              value={app?.devCallbackUrl}
              onChange={() => {}}
            />
          </GridItem>
        </Grid>
      </Container>
      <Box my={20}></Box>
      <Box position="fixed" bottom={0} left={0} right={0} bg="white">
        <hr style={{ width: "100%" }} />
        <Container
          maxW="container.xl"
          h="80px"
          gap="5"
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <Spacer />

          <Button colorScheme="red" variant="ghost">
            Discard Changes
          </Button>
          <Button colorScheme="katrade">Save</Button>
        </Container>
      </Box>
    </>
  );
};

export default ClientPage;
