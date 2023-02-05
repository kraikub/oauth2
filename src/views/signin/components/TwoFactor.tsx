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
import { getCountDownString } from "../../../utils/time";

interface TwoFactorProps {
  signInMethod: SignInMethodType;
  handleSignin: (options?: SigninOptions) => Promise<any>;
  OTPRef: string;
  authForEmail: string;
  OTPExpire: number;
  back: () => void;
}

export const TwoFactor: FC<TwoFactorProps> = ({
  signInMethod,
  handleSignin,
  OTPRef,
  authForEmail,
  OTPExpire,
  back,
}) => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [exp, setExp] = useState<string>(getCountDownString(OTPExpire * 1000));
  const { t } = useTranslation("signin");

  const greenThemeColor = useColorModeValue(
    "kraikub.green.600",
    "kraikub.green.300"
  );
  const defaultButtonBgColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.300"
  );
  const eachDigitStyles = {
    fontWeight: 600,
    flex: 1,
    bg: defaultButtonBgColor,
    h: "66px",
  };

  useEffect(() => {
    const intv = setInterval(() => {
      setExp(getCountDownString(OTPExpire * 1000));
    }, 1000);
    return () => clearInterval(intv);
  }, []);

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
      signin_method: signInMethod,
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
        <Text mt={2} color={greenThemeColor} fontWeight={700}>
          {exp || t("expired")}
        </Text>
        <form onSubmit={handleFormSubmit}>
          <HStack my={6} justifyContent="space-between">
            <PinInput
              otp
              type="number"
              size="lg"
              placeholder=""
              variant="solid"
              value={code}
              onChange={handleInputChange}
            >
              <PinInputField
                {...eachDigitStyles}
                autoComplete="off"
                autoSave="off"
              />
              <PinInputField
                {...eachDigitStyles}
                autoComplete="off"
                autoSave="off"
              />
              <PinInputField
                {...eachDigitStyles}
                autoComplete="off"
                autoSave="off"
              />
              <PinInputField
                {...eachDigitStyles}
                autoComplete="off"
                autoSave="off"
              />
              <PinInputField
                {...eachDigitStyles}
                autoComplete="off"
                autoSave="off"
              />
              <PinInputField
                {...eachDigitStyles}
                autoComplete="off"
                autoSave="off"
              />
            </PinInput>
          </HStack>
          <Button
            w="full"
            gap={2}
            onClick={back}
            h="60px"
            bgColor={defaultButtonBgColor}
            color={greenThemeColor}
            textTransform="uppercase"
            fontWeight={600}
            rounded="full"
            isDisabled={loading}
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
