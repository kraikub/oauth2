import {
  Container,
  HStack,
  VStack,
  Heading,
  ButtonGroup,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { CookieConsentScreen } from "./CookieConsentScreen";
import { LangSetup } from "./LangSetup";

export const Setup: FC = () => {
  const [step, setStep] = useState<number>(1);

  const next = () => {
    if (step === 2) return;
    setStep(step + 1);
  };
  const back = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  const getStepComponent = () => {
    switch (step) {
      case 1: {
        return <LangSetup next={next} back={back} />;
      }
      case 2: {
        return <CookieConsentScreen />;
      }
      default: {
        return null;
      }
    }
  };
  return (
    <Box>
      <Box position="fixed" bottom="30px" left={0} right={0}>
        <Container maxW="container.sm">
          <HStack justifyContent="center" alignItems="center">
           <Text fontSize={12}>Lets have a little setup for your device.</Text>
          </HStack>
        </Container>
      </Box>
      <Container
        maxW="container.sm"
        h="100vh"
        py="60px"
        display="flex"
        alignItems="center"
      >
        {getStepComponent()}
      </Container>
    </Box>
  );
};
