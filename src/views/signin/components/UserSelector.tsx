import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { appConfig } from "../../../../api/config/app";
import { FooterShort } from "../../../layouts/FooterShort";

interface UserSelectorProps {
  user: FullUserData;
  reject: () => void;
  handleSignin: (options?: SigninOptions) => any;
  loading: boolean;
}

export const UserSelector: FC<UserSelectorProps> = ({
  user,
  reject,
  handleSignin,
  loading,
}) => {
  return (
    <>
      <Container
        maxW="container.sm"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <Box width="full">
          <Heading size="md" mb="30px" letterSpacing={-1}>
            Continue with KU Account
          </Heading>
          <Text fontSize={14}>This device was signed in with this account</Text>
          <Flex my={3} bg="gray.100" width="full" p={5} rounded={14} gap={4}>
            <Box>
              <Image
                src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
                alt="account-owner-profile-image"
                w={50}
                rounded="full"
              ></Image>
            </Box>
            <Box>
              <Text fontWeight={600}>
                {user.student.nameEn.split(" ").splice(1).join(" ")}
              </Text>
              <Text fontWeight={400} fontSize={14} opacity={0.7}>
                {user.universityEmail || "ยังไม่ยืนยันอีเมล"}
              </Text>
            </Box>
          </Flex>
          <ButtonGroup
            justifyContent="end"
            width="full"
            my={4}
            alignItems="center"
          >
            <Button
              variant="ghost"
              fontSize={14}
              rounded="full"
              onClick={reject}
            >
              Use another
            </Button>
            <Button
              colorScheme="katrade"
              rounded="full"
              fontWeight={600}
              onClick={() => handleSignin({ signin_method: "credential" })}
              isLoading={loading}
            >
              Continue
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
      <FooterShort />
    </>
  );
};
