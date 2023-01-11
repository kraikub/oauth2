import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  Input,
  Progress,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, SyntheticEvent, useRef, useState } from "react";
import { Card } from "../../components/Card";
import { CustomInput } from "../../components/inputs/Input";
import StaticNavbar from "../../layouts/StaticNavbar";
import { internalServiceApi } from "../../services/internalService";
import { Complete } from "./components/Complete";

export const SignUpPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<string>("");
  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const target = e.target as typeof e.target & {
        firstName: { value: string };
        lastName: { value: string };
        email: { value: string };
        accountType: { value: string };
      };
      const res = await internalServiceApi.signUp({
        firstName: target.firstName.value,
        lastName: target.lastName.value,
        accountType: target.accountType.value,
        email: target.email.value,
      });
      if (res.status !== 200) {
        return console.warn(res.status, res.data);
      }
      emailRef.current = target.email.value;
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <StaticNavbar />
      <Container maxW="container.sm" my={10}>
        {success ? (
          <Complete email={emailRef.current} />
        ) : (
          <Card
            props={{
              pt: 10,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box position="absolute" top={0} left={0} right={0}>
              {loading ? (
                <Progress
                  colorScheme="kraikub.blue.always"
                  size="xs"
                  isIndeterminate
                />
              ) : null}
            </Box>
            <Heading size="md">Create your Kraikub ID</Heading>
            <Text fontSize={12} fontWeight={400} opacity={0.7} mt={2}>
              Non-student Account
            </Text>
            <form onSubmit={handleFormSubmit}>
              <VStack mt={8} alignItems="start" spacing={10}>
                <HStack flexWrap="wrap" spacing={[0, 2]} rowGap={8}>
                  <CustomInput
                    maxW={["100%", "200px"]}
                    placeholder="First name"
                    name="firstName"
                    isRequired
                  />
                  <CustomInput
                    maxW={["100%", "200px"]}
                    placeholder="Last name"
                    name="lastName"
                    isRequired
                  />
                </HStack>
                <VStack spacing={2} alignItems="start" w="full">
                  <Text fontSize={14} fontWeight={400}>
                    Email{" "}
                    <Box as="span" opacity={0.7}>
                      (A verification email will be sent to)
                    </Box>
                  </Text>
                  <CustomInput
                    maxW={["100%", "400px"]}
                    placeholder="Email"
                    type="email"
                    name="email"
                    isRequired
                  />
                </VStack>
                <VStack spacing={2} alignItems="start" w="full">
                  <Text>You want to use this account as</Text>
                  <Select
                    placeholder="Select account type"
                    size="sm"
                    maxW={["100%", "200px"]}
                    name="accountType"
                    required
                  >
                    <option value="personal">
                      Personal account (Non-student)
                    </option>
                    <option value="corporate">Corporate/Organization</option>
                  </Select>
                </VStack>
                <ButtonGroup justifyContent="end" w="full">
                  <Button
                    colorScheme="kraikub.blue.always"
                    color="white"
                    type="submit"
                    isLoading={loading}
                  >
                    Continue
                  </Button>
                </ButtonGroup>
              </VStack>
            </form>
          </Card>
        )}
      </Container>
    </>
  );
};
