import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { SimpleFadeInRight } from "../../../components/animations/SimpleFadeInRight";
import { Card, CardContent } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";

interface ConsentFormProps {
  scope: string;
  appName: string;
  handleSignin: (options?: SigninOptions) => any | (() => Promise<any>);
  handleReject: () => any | (() => Promise<any>);
  loading: boolean;
  signInMethod: SignInMethodType;
}

type ConsentData = {
  label: string;
  requires: string[];
  disableBorder?: boolean;
};

export const ConsentForm: FC<ConsentFormProps> = ({
  scope,
  appName,
  handleSignin,
  handleReject,
  loading,
  signInMethod,
}) => {
  const { t } = useTranslation("signin");
  const consentDataList: ConsentData[] = [
    {
      label: t("consent-scope-openid"),
      requires: ["openid"],
    },
    {
      label: t("consent-scope-fullname"),
      requires: ["provider", "fullname"],
    },
    {
      label: t("consent-scope-profile-pic"),
      requires: ["provider", "profile_pic"],
    },
    {
      label: t("consent-scope-email"),
      requires: ["provider", "personal_email"],
    },
    {
      label: t("consent-scope-account-type"),
      requires: ["provider", "account_type"],
    },
    {
      label: t("consent-scope-student"),
      requires: ["provider", "student"],
    },
    {
      label: t("consent-scope-education"),
      requires: ["provider", "educations"],
    },
  ];
  const dataListWithScope = (scope: string) => {
    let result: ConsentData[] = [];
    let splt = scope.split(" ");
    for (let consent of consentDataList) {
      for (let each of splt) {
        if (consent.requires.includes(each)) {
          result.push(consent);
          break;
        }
      }
    }
    result[result.length - 1].disableBorder = true;
    return result;
  };
  return (
    <Box overflow="hidden" w="100%" pt={5}>
      <SimpleFadeInRight>
        <Heading size="md" mb={2}>
          <Box as="span" lang="en">
            {appName}
          </Box>{" "}
          {t("conset-header")}
        </Heading>
        <Text mb={3} fontSize={14}>
          {t("consent-msg-1")} {appName} {t("consent-msg-2")}
        </Text>

        {scope === "0" ? (
          <Each
            label="ไม่มีการเปิดเผยข้อมูล"
            requires={["0"]}
            disableBorder={true}
            scope={scope}
          />
        ) : null}
        {dataListWithScope(scope).map((data: ConsentData, index: number) => {
          return <Each scope={scope} {...data} key={`consent-${index}`} />;
        })}

        <Flex justifyContent="end" mt={12} alignItems="center" gap={2}>
          <Button
            size="lg"
            variant="ghost"
            colorScheme="kraikub.green.always"
            onClick={handleReject}
          >
            {t("consent-btn-cancel")}
          </Button>
          <Button
            size="lg"
            colorScheme="kraikub.green.always"
            color="white"
            onClick={() => handleSignin({ signin_method: signInMethod })}
            isLoading={loading}
          >
            {t("consent-btn-allow")}
          </Button>
        </Flex>
      </SimpleFadeInRight>
    </Box>
  );
};

interface EachProps extends ConsentData {
  scope: string;
}

const Each: FC<EachProps> = ({ label, disableBorder }) => {
  const dynamicTealColor = useColorModeValue(
    "kraikub.green.500",
    "kraikub.green.500"
  );
  return (
    <>
      {/* <CustomDivider sx={{ my: 0 }} /> */}
      <Flex py={4} px={6} gap={3} alignItems="center">
        <Box color={dynamicTealColor}>
          <BsFillCheckCircleFill fontSize={20} />
        </Box>
        <Text fontSize={14} opacity={0.7}>
          {label}
        </Text>
      </Flex>
      {/* {disableBorder ? null : <CustomDivider sx={{ my: 0 }} />} */}
    </>
  );
};
