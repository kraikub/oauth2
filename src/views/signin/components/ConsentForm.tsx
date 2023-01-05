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
import { Card } from "../../../components/Card";

interface ConsentFormProps {
  scope: string;
  appName: string;
  handleSignin: () => any | (() => Promise<any>);
  handleReject: () => any | (() => Promise<any>);
  loading: boolean;
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
}) => {
  const { t } = useTranslation("signin");
  const dynamicTealColor = useColorModeValue("teal.600", "teal.200");
  const cardBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100")
  const consentDataList: ConsentData[] = [
    {
      label: t("consent-scope-name"),
      requires: ["provider", "student"],
    },
    {
      label: t("consent-scope-uemail"),
      requires: ["provider", "university_email"],
    },
    {
      label: t("consent-scope-pemail"),
      requires: ["provider", "personal_email"],
    },
    {
      label: t("consent-scope-edu"),
      requires: ["provider", "education"],
    },
    {
      label: t("consent-scope-openid"),
      requires: ["openid"],
    },
  ];
  const dataListWithScope = (scope: string) => {
    
    let result: ConsentData[] = []
    let splt = scope.split(" ")
    for (let consent of consentDataList) {
      for (let each of splt) {
        if (consent.requires.includes(each)) {
          result.push(consent)
          break;
        }
      }
    }
    result[result.length - 1].disableBorder = true;
    return result;
  };
  return (
    <Box overflow="hidden" w="100%">
      <SimpleFadeInRight>
        <Heading size="md" mb={6}>
          <Box as="span" lang="en" color={dynamicTealColor}>
            {appName}
          </Box>{" "}
          {t("conset-header")}
        </Heading>
        <Text mb={3} fontSize={14}>
          {t("consent-msg-1")} {appName} {t("consent-msg-2")}
        </Text>
        <Card
          props={{
            p: 0,
            my: 6,
            bg: cardBg,
            boxShadow: "none"
          }}
        >
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
        </Card>
        <Flex justifyContent="end" mt={12} alignItems="center" gap={2}>
          <Button
            size="lg"
            variant="ghost"
            colorScheme="teal"
            onClick={handleReject}
          >
            {t("consent-btn-cancel")}
          </Button>
          <Button
            size="lg"
            colorScheme="teal"
            onClick={handleSignin}
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
  const dynamicTealColor = useColorModeValue("teal.400", "teal.200");
  return (
    <Flex
      border={disableBorder ? "none" : "solid #00000020"}
      borderWidth="0 0 1px 0"
      py={4}
      px={6}
      gap={3}
      alignItems="center"
    >
      <Box color={dynamicTealColor}>
        <BsFillCheckCircleFill fontSize={20} />
      </Box>
      <Text fontSize={14} opacity={0.7}>
        {label}
      </Text>
    </Flex>
  );
};
