import { FC } from "react";
import Navbar from "../../../../layouts/Navbar";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";
import { Application } from "../../../../../db/schema/application";

interface ClientPageProps {
  app: Application | null;
}

const ClientPage: FC<ClientPageProps> = ({ app }) => {
  return (
    <>
      <Navbar />
      <Box bg="linear-gradient(269deg, #15A835 31.15%, #00D2A0 70.74%)">
        <Container
          maxW="container.xl"
          h="200px"
          color="white"
          display="flex"
          alignItems="center"
        >
          <Box>
            <Heading fontWeight={800} fontSize="44px">
              {app?.appName}
            </Heading>
            <Heading fontWeight={600} fontSize="20px">
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
            <Input size="md" my={2} value={app?.appName}/>
            <Text fontWeight={500} fontSize="16px">
              Creator Name
            </Text>
            <Input size="md" my={2} value={app?.creatorName}/>
            <Text fontWeight={500} fontSize="16px">
              App Description
            </Text>
            <Textarea my={2} width="100%" value={app?.appDescription}/>
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
              <Text color="#4E2CDA" my={2} word-wrap="break-word">
                {app?.ownerId}
              </Text>
              <FaCopy />
            </HStack>
            <Text fontWeight={500} fontSize="16px">
              Secret
            </Text>
            <HStack>
              <Text color="#4E2CDA" my={2}>
                {app?.secret}
              </Text>
              <FaCopy />
            </HStack>
            <Button colorScheme="red" variant="outline" size="sm" w="10%">
              Hide
            </Button>
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
            <Input size="sm" my={2} value={app?.callbackUrl}/>
            <Text fontWeight={500} fontSize="16px">
              Callback URL (development)
            </Text>
            <Input size="sm" my={2} value={app?.devCallbackUrl}/>
          </GridItem>
        </Grid>
      </Container>
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
    </>
  );
};

export default ClientPage;
