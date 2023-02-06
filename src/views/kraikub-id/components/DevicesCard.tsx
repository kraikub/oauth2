import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  useColorModeValue,
  Text,
  VStack,
  Link,
  Collapse,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { Card, CardContent } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";
import {
  IoPhonePortraitOutline,
  IoLaptopOutline,
  IoLaptopSharp,
  IoPhonePortrait,
} from "react-icons/io5";
import { RiMacbookLine } from "react-icons/ri";
import { useClientTranslation } from "../../../hooks/client-translation";
import { dictDeviceCard } from "../../../translate/kraikubid";
import { MdAndroid } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const patternList = [
  { pattern: "iPhone", value: "iPhone" },
  { pattern: "Macintosh", value: "macOS" },
  { pattern: "Android", value: "Android" },
  { pattern: "Windows", value: "Windows" },
];

export const deviceMap = (ua: string, uap: string) => {
  if (uap) {
    return uap;
  }
  for (const e of patternList) {
    if (ua.includes(e.pattern)) return e.value;
  }
  return "Unknown";
};

const whichIcon = (k: string) => {
  switch (k) {
    case "iPhone": {
      return <IoPhonePortraitOutline />;
    }
    case "Macintosh": {
      return <RiMacbookLine />;
    }
    case "macOS": {
      return <RiMacbookLine />;
    }
    case "Windows": {
      return <AiFillAppstore />;
    }
    case "Android": {
      return <MdAndroid />;
    }
  }
};

interface DevicesProps {
  // accesses: ReducedAccess[]
  logs: ReducedLog[];
}

const classify = (logs: ReducedLog[]) => {
  const resMap: {
    [key: string]: EachDeviceDetails;
  } = {};
  for (const l of logs) {
    const d = deviceMap(l.userAgent, l.userAgentPlatform);
    const key = d + "-" + l.ip;
    if (!resMap[key]) {
      resMap[key] = {
        name: d.replaceAll(`"`, ""),
        ua: l.userAgent,
        timestamp: [new Date(l.timestamp)],
        ip: l.ip,
      };
    } else {
      resMap[key].timestamp.push(new Date(l.timestamp));
    }
  }
  return resMap;
};

interface DevicesCardProps {
  logs: ReducedLog[];
}

interface EachDeviceDetails {
  name: string;
  ua: string;
  timestamp: Date[];
  ip: string;
}

interface EachProps {
  keyName: string;
  device: EachDeviceDetails;
  last: boolean;
}

const Each: FC<EachProps> = ({ keyName, device, last }) => {
  const { t } = useClientTranslation(dictDeviceCard);
  const deviceIconBg = useColorModeValue("#00b35e", "#00b35e");
  const deviceIconColor = useColorModeValue("#ffffff", "#ffffff");
  const [expand, setExpand] = useState(false);
  const mainCardStyles = {
    rounded: 12,
    w: "full",
    boxShadow: "none",
  };
  return (
    <Box
      w="full"
      ps={4}
      cursor="pointer"
      onClick={() => setExpand(true)}
      _hover={{
        bg: useColorModeValue("blackAlpha.50", "whiteAlpha.100"),
      }}
    >
      <HStack justifyContent="space-between" alignItems="end" py={3} pe={4}>
        <HStack spacing={4}>
          <Flex
            w="38px"
            h="38px"
            justifyContent="center"
            alignItems="center"
            bg={deviceIconBg}
            color={deviceIconColor}
            rounded="full"
            fontSize={22}
          >
            {whichIcon(device.name)}
          </Flex>
          <Box>
            <Text fontWeight={600}>{device.name}</Text>
            <Text fontSize={12} fontWeight={600} opacity={0.6}>
              {device.ip.length < 30
                ? device.ip
                : device.ip.slice(0, 25) + "..."}
            </Text>
          </Box>
        </HStack>
        <HStack opacity={0.6} spacing={1}>
          <Text fontSize={12}>
            {t("btn-see-more")} ({device.timestamp.length})
          </Text>
          <IoIosArrowForward size="12px" />
        </HStack>
      </HStack>
      <Modal isOpen={expand} onClose={() => setExpand(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text
              fontSize={12}
              fontWeight={600}
              textTransform="uppercase"
              opacity={0.7}
              width="fit-content"
            >
              Device Information
            </Text>
            <Card
              disableMobileBorder
              props={{
                ...mainCardStyles,
                bg: useColorModeValue("blackAlpha.100", "whiteAlpha.200"),
                mt: 4,
              }}
            >
              <HStack spacing={3}>
                <Flex
                  w="46px"
                  h="46px"
                  justifyContent="center"
                  alignItems="center"
                  bg={deviceIconBg}
                  color={deviceIconColor}
                  rounded="full"
                  fontSize={22}
                >
                  {whichIcon(device.name)}
                </Flex>
                <Box>
                  <Text fontWeight={600}>{device.name}</Text>
                  <Text fontSize={12} fontWeight={600} opacity={0.6}>
                    {device.ip.length < 30
                      ? device.ip
                      : device.ip.slice(0, 25) + "..."}
                  </Text>
                </Box>
              </HStack>
            </Card>
            <Box mt={4}>
              <Text fontSize={12} fontWeight={600} textTransform="uppercase">
                Login history ({device.timestamp.length})
              </Text>
            </Box>
          </ModalHeader>
          <ModalBody overflow="auto">
            <Box>
              <VStack spacing={0}>
                {device.timestamp
                  .sort((a, b) => {
                    if (a.getTime() > b.getTime()) {
                      return -1;
                    } else if (a.getTime() < b.getTime()) {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                  .map((each, index) => {
                    return (
                      <Box key={`time-index-${index}`} w="full">
                        <Text my={3} opacity={0.7} fontSize={12}>
                          {each.toLocaleDateString()}{" "}
                          {each.toLocaleTimeString()}
                        </Text>
                        {index === device.timestamp.length - 1 ? null : (
                          <CustomDivider sx={{ my: 0 }} />
                        )}
                      </Box>
                    );
                  })}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {last ? null : <CustomDivider sx={{ my: 0 }} />}
    </Box>
  );
};

export const DevicesCard: FC<DevicesCardProps> = ({ logs }) => {
  const { t } = useClientTranslation(dictDeviceCard);
  const catMap = classify(logs);
  return (
    <Box w="full">
      <Card props={{ p: 0, overflow: "hidden" }}>
        <CardContent>
          <HStack justifyContent="space-between">
            <Box>
              <Text
                fontWeight={600}
                textTransform="uppercase"
                opacity={0.6}
                fontSize={12}
              >
                {t("header")}
              </Text>
              <Heading fontWeight={500} size="md" mt={1}>
                {t("header-desc")}
              </Heading>
            </Box>
          </HStack>
        </CardContent>
        <CustomDivider sx={{ my: 0 }} />
        <CardContent
          props={{
            p: 0,
          }}
        >
          <VStack spacing={0}>
            {Object.keys(catMap).slice(0,6).map((k, index) => {
              const keyName = k.replaceAll(`"`, "");
              const device = catMap[k];
              return (
                <Each
                  key={`device-list-${index}`}
                  {...{ keyName, device }}
                  last={index === Object.keys(catMap).length - 1}
                />
              );
            })}
          </VStack>
        </CardContent>
      </Card>
    </Box>
  );
};
