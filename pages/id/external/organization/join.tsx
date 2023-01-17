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
import { orgUsecase } from "../../../../api/usecases/organization";

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
  const result = await orgUsecase.activateInvite(vssid);
  console.log(result.success)
  return {
    props: {
      success: result.success,
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
          <HStack spacing={2} flexWrap="wrap" alignItems="center">
            <Heading size="md">Joined</Heading>
            <Box color={color}>
              <GoCheck size="30px" />
            </Box>
          </HStack>
          <Text fontSize={20} fontWeight={600} opacity={0.6} mt={6}>
            You are now ready with your new team. Have a good time on Kraikub :P.
          </Text>
        </Box>
      </Center>
    </Container>
  );
};

export default Page;
