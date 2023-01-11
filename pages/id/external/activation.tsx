import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { GoCheck } from "react-icons/go";
import { userUsecase } from "../../../api/usecases";
import { redis } from "../../../data/redis";

interface VerificationSession {
  email: string;
  uid: string;
  status: boolean;
}

interface PageProps {
  success: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const vssid = context.query.vssid;
  if (typeof vssid !== "string") {
    return {
      props: {
        success: false,
      },
    };
  }
  const isCreateUserSuccess = await userUsecase.activateSignUp(vssid)
  return {
    props: {
      success: isCreateUserSuccess,
    },
  };
};

const Page: NextPage<PageProps> = ({ success }) => {
  const color = useColorModeValue("kraikub.blue.400", "teakraikub.blue.200");
  if (!success) {
    return (
      <Container size="md">
        <Center minH="100vh">
          <Heading size="md">Sorry, this link was expired or invalid.</Heading>
        </Center>
      </Container>
    );
  }
  return (
    <Container size="md">
      <Center minH="100vh">
        <Box w="full">
          <HStack spacing={5} flexWrap="wrap" alignItems="center">
            <Heading>Kraikub ID Activated</Heading>
            <Box color={color}>
              <GoCheck size="50px" />
            </Box>
          </HStack>
          <Text fontSize={20} fontWeight={600} opacity={0.6} mt={6}>
            You can now go back to your previous browser and you are ready to go.
          </Text>
        </Box>
      </Center>
    </Container>
  );
};

export default Page;
