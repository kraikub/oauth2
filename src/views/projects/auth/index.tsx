import {
  Button,
  Code,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";

export const ProjectAuthSigninPage: NextPage = () => {
  return (
    <Container maxW="container.md" py={20}>
      <Heading fontWeight={400} textAlign="center" mb={20}>เริ่มต้นใช้งาน Accounts API</Heading>
      <VStack spacing={6}>
        <Text>สำหรับนิสิต/บุคคลากร KU</Text>
        <Button
          fontWeight={500}
          fontFamily="'Inter', sans-serif"
          rounded={4}
          bg="#0ea14e"
          color="white"
          _hover={{ bg: undefined }}
          _active={{ bg: undefined }}
          minW="300px"
        >
          Sign in with KU
        </Button>
      </VStack>
      <Divider my={10} />
      <VStack spacing={6}>
        <Text>สำหรับบุคคลภายนอก</Text>
        <Text>
          กรุณาติดต่อ <Code>beamuonly@gmail.com</Code>
        </Text>
      </VStack>
    </Container>
  );
};
