import {
  Box,
  Center,
  Heading,
  HStack,
  Link,
  LinkBox,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { MdEmail } from "react-icons/md";
import { Card } from "../../../components/Card";
import { getSigninUrl } from "../../../utils/path";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface CompleteProps {
  email: string;
}

export const Complete: FC<CompleteProps> = ({ email }) => {
  return (
    <Card
      props={{
        pt: 10,
      }}
    >
      <Heading size="md">Thanks for signing up an account.</Heading>
      <Text fontSize={14} fontWeight={500} mt={4}>
        We have sent a verification email to{" "}
        <Box as="span" color="kraikub.green.500">
          <strong>{email}</strong>
        </Box>
        . Please check your inbox and activate your Kraikub ID.
      </Text>
      <Center py={10}>
        <AnimationOnScroll>
          <MdEmail size="48px" />
        </AnimationOnScroll>
      </Center>
      <HStack mt={8} justifyContent="end">
        <NextLink href={getSigninUrl({})}>
          <a>
            <Link fontSize={16} color="kraikub.green.500">
              Sign in
            </Link>
          </a>
        </NextLink>
      </HStack>
    </Card>
  );
};
