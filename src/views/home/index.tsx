import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
  ButtonGroup,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import bg from "../../../public/bg-2.png";
import bgx from "../../../public/bg-1.png";
import dataProtection from "../../../public/data-protection.png";
import anonymous from "../../../public/anonymous.png";

const HomePage: FC = () => {
  const headerBaseStyles = {
    fontWeight: 600,
    letterSpacing: "-1px",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleToSigninPage = () => {
    setLoading(true);
    return router.push("/projects/manager");
  };
  return (
    <Box pb="100px">
      <Box
        minH="100vh"
        bgImage={bg.src}
        bgPosition="center"
        bgSize="cover"
        borderRadius="0 0 28px 28px"
      >
        <Container maxW="container.xl" py="24vh" position="relative" h="full">
          <Box maxW="700px">
            <Heading fontSize="3rem">Build your KU app with kraikub</Heading>
            <Text fontWeight={600} fontSize={26} my={6}>
              Kraikub is a software development platform for KU.
            </Text>
            <Flex my={8} flexWrap="wrap" gap={4}>
              <Button
                size="md"
                bg="katrade.main"
                color="white"
                _hover={{ bg: undefined }}
                onClick={() => router.push("/projects/manager")}
              >
                Try now
              </Button>
              <Button
                size="md"
                bg="#00000010"
                color="black"
                _hover={{ bg: "#00000030" }}
              >
                How it works ?
              </Button>
            </Flex>
          </Box>
          <Center mt="180px">
            <Box>
              <Box
                px={10}
                py={3}
                mb={8}
                // bgImage={bgx.src}
                // bgSize="cover"
                // bgPos="center"
                // color="white"
                bg="#010101"
                color="white"
                boxShadow="10px 10px 0px #EE1D52, -10px -10px 0px #69C9D0"
                rounded={4}
                fontSize={18}
                fontWeight={600}
                fontFamily="'Roboto Mono', monospace"
              >
                npm install kraikub
              </Box>
              <Text textAlign="center" fontWeight={600} fontSize={16}>
                Proudly made for Developers.
              </Text>
            </Box>
          </Center>
        </Container>
      </Box>
      <Box>
        <Container maxW="container.lg" py="100px">
          <Heading
            {...headerBaseStyles}
            size="lg"
            textAlign="center"
            fontWeight={600}
          >
            Key Features
          </Heading>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} my={16} gap={20}>
            <VStack spacing={16}>
              <Heading {...headerBaseStyles} size="md">
                Users Authentication
              </Heading>
              <Box h="80px">
                <Center
                  bg="katrade.main"
                  h="50px"
                  px={20}
                  rounded={6}
                  color="white"
                  fontWeight={500}
                >
                  Sign in with KU
                </Center>
              </Box>
              <Box color="#00000090" maxW={300} fontWeight={500}>
                We provide authentication service that help developers to
                identify their users identity with Kasetsart University.
              </Box>
            </VStack>
            <VStack spacing={16}>
              <Heading {...headerBaseStyles} size="md">
                Students API
              </Heading>
              <Box h="80px">
                <Image src={dataProtection.src} alt="data-icon" h="60px" />
              </Box>
              <Box color="#00000090" maxW={300} fontWeight={500}>
                Students API is an interface which help developers to request
                student’s data from Kasetsart API easily. Students API{" "}
                <Box as="span" color="katrade.main" fontWeight={700}>
                  protect your sensitive data, personal data
                </Box>{" "}
                and let you customize how apps can access your personal data.
              </Box>
            </VStack>
            <VStack spacing={16}>
              <Heading {...headerBaseStyles} size="md">
                Anonymous Sign in
              </Heading>
              <Box h="80px">
                <Image src={anonymous.src} alt="data-icon" h="60px" />
              </Box>
              <Box color="#00000090" maxW={300} fontWeight={500}>
                Sign in to any app on Kraikub{" "}
                <Box as="span" color="katrade.main" fontWeight={700}>
                  with out revealing any of your personal data
                </Box>
                {". "}
                Apps will only know that you are Kasetsart University student,
                but {"won't"} know who you are.
              </Box>
            </VStack>
          </SimpleGrid>

          <VStack my="200px" gap={6}>
            <Heading {...headerBaseStyles} textAlign="center">
              Unlock your{" "}
              <Box as="span" color="katrade.main" fontWeight={700}>
                ideas
              </Box>
            </Heading>
            <Text fontSize={20} fontWeight={500} maxW={560} textAlign="center">
              Kraikub let you create applications a lot easier. Sign up now, and
              make KU better with your hands.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};
export default HomePage;
