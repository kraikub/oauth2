import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";
import { SimpleFadeInRight } from "../../../components/animations/SimpleFadeInRight";

interface TwoFactorProps {
  setStep: Dispatch<SetStateAction<number>>;
  handleSignin: (options?: SigninOptions) => Promise<any>;
  OTPRef: string;
  authForEmail: string;
}

export const TwoFactor: FC<TwoFactorProps> = ({
  setStep,
  handleSignin,
  OTPRef,
  authForEmail,
}) => {
  console.log(OTPRef);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("signin");
  const eachDigitStyles = {
    fontWeight: 600,
    bg: useColorModeValue("blackAlpha.100", "whiteAlpha.300"),
    h: "80px",
    w: "70px",
  };

  useEffect(() => {
    if (code.length === 6) {
      verify();
    }
  }, [code]);

  const handleInputChange = (v: string) => {
    if (loading) return;
    setCode(v);
  };

  const verify = async () => {
    setLoading(true);
    await handleSignin({
      otp: code,
    });
    setCode("");
    setLoading(false);
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await verify();
  };

  return (
    <SimpleFadeInRight>
      <Box w="100%">
        <Heading size="md">{t("2fa-header")}</Heading>
        <Text mt={3} fontWeight={400} lineHeight="20px" fontSize={14}>
          {t("2fa-description-1")}
          <strong>{` ${authForEmail} `}</strong>
          {t("2fa-description-2")}
        </Text>
        <Text mt={2}>REF: {OTPRef}</Text>
        <form onSubmit={handleFormSubmit}>
          <HStack my={6}>
            <PinInput
              otp
              type="number"
              size="lg"
              placeholder=""
              variant="filled"
              value={code}
              onChange={handleInputChange}
            >
              <PinInputField {...eachDigitStyles} />
              <PinInputField {...eachDigitStyles} />
              <PinInputField {...eachDigitStyles} />
              <PinInputField {...eachDigitStyles} />
              <PinInputField {...eachDigitStyles} />
              <PinInputField {...eachDigitStyles} />
            </PinInput>
          </HStack>
          <Button
            w="full"
            gap={2}
            onClick={() => setStep(0)}
            h="60px"
            colorScheme={loading ? "teal" : "gray"}
          >
            {loading ? (
              t("2fa-btn-verify")
            ) : (
              <>
                <IoIosArrowBack />
                {t("2fa-btn-back")}
              </>
            )}
          </Button>
        </form>
      </Box>
    </SimpleFadeInRight>
  );
};
