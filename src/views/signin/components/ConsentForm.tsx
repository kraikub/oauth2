import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { SimpleFadeInRight } from "../../../components/animations/SimpleFadeInRight";

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

const consentDataList: ConsentData[] = [
  {
    label: "See your firstname, lastname and email",
    requires: ["1", "2"],
  },
  {
    label: "See your educational profile under Kasetsart University",
    requires: ["1", "2"],
  },
  {
    label: "See your grades",
    requires: ["2"],
  },
];

const dataListWithScope = (scope: string) => {
  let result = consentDataList.filter((consent) =>
    consent.requires.includes(scope)
  );
  if (!result.length) return [];
  result[result.length - 1].disableBorder = true;
  return result;
};

export const ConsentForm: FC<ConsentFormProps> = ({
  scope,
  appName,
  handleSignin,
  handleReject,
  loading,
}) => {
  return (
    <Box overflow="hidden" w="100%">
      <SimpleFadeInRight>
        <Heading size="md" mb={6}>
          <Box as="span" lang="en" color="green">
            {appName}
          </Box>{" "}
          wants to
        </Heading>
        <Text mb={3} color="#000000a0" fontSize={14}>
          This application named {appName} want to access your personal
          information.
        </Text>
        <Box
          my={6}
          rounded="8px"
          backgroundColor="#FAFAFA"
          border="1px solid #00000020"
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
        </Box>
        <Flex justifyContent="end" mt={12} alignItems="center" gap={2}>
          <Button
            size="lg"
            variant="ghost"
            colorScheme="green"
            onClick={handleReject}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            colorScheme="katrade"
            onClick={handleSignin}
            isLoading={loading}
          >
            Allow
          </Button>
        </Flex>
      </SimpleFadeInRight>
    </Box>
  );
};

interface EachProps extends ConsentData {
  scope: string;
}

const Each: FC<EachProps> = ({ label, requires, disableBorder, scope }) => {
  if (!requires.includes(scope)) {
    return null;
  }
  return (
    <Flex
      border={disableBorder ? "none" : "solid #00000020"}
      borderWidth="0 0 1px 0"
      py={4}
      px={6}
      color="#000000b0"
      gap={3}
      alignItems="center"
    >
      <BsFillCheckCircleFill color="green" />
      <Text fontSize={14}>{label}</Text>
    </Flex>
  );
};
