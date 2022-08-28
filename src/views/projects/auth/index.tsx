import {
  Box,
  Button,
  Code,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import bg from "../../../../public/bg-1.png";

export const ProjectAuthSigninPage: NextPage = () => {
  const router = useRouter();
  return (
    <Box bgImage={bg.src} bgPosition="center" bgSize="cover">
      <Container
        maxW="container.md"
        py={20}
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box color="white">
          <Heading fontWeight={600} textAlign="center" mb={20}>
            เริ่มต้นใช้งาน Kraikub
          </Heading>
          <VStack spacing={6}>
            <Text>สำหรับนิสิต/บุคคลากร KU</Text>
            <Button
              fontWeight={600}
              rounded={10}
              size="lg"
              bg="white"
              color="katrade.main"
              _hover={{ bg: undefined }}
              _active={{ bg: undefined }}
              minW="300px"
              onClick={() => router.push("/projects/manager")}
            >
              Sign in with KU
            </Button>
          </VStack>
          <Divider my={10} />
          <VStack spacing={6}>
            <Text>สำหรับบุคคลภายนอก</Text>
            <Text>
              กรุณาติดต่อ{" "}
              <Code px={3} fontWeight={500} bg="#ffffff60">
                beamuonly@gmail.com
              </Code>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};
