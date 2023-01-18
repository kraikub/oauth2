import { Button, Container, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Card } from "../../../components/Card";

export const NoKraikubID = () => {
  return (
    <Container maxW="container.sm" py="20px">
      <Card>
        <Heading size="md">Need a Kraikub ID</Heading>
        <Text mt={2}>
          You need to activate your Kraikub ID before using organization mode.
        </Text>
        <Link href="/id">
          <a>
            <Button
              colorScheme="kraikub.blue.always"
              color="white"
              size="lg"
              mt={8}
              w="full"
            >
              Activate Kraikub ID
            </Button>
          </a>
        </Link>
      </Card>
    </Container>
  );
};
