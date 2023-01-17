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
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { Card } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";
import { IoPhonePortraitOutline, IoLaptopOutline } from "react-icons/io5";
import {
  IoIosArrowRoundForward,
} from "react-icons/io";
import { useClientTranslation } from "../../../hooks/client-translation";
import { dictDeviceCard } from "../../../translate/kraikubid";

const patternList = [
  { pattern: "iPhone", value: "iPhone"}, 
  { pattern: "Macintosh", value: "macOS"}, 
  { pattern: "Android", value: "Android"}, 
  { pattern: "Windows", value: "Windows"}, 
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
      return <IoLaptopOutline />;
    }
    case "macOS": {
      return <IoLaptopOutline />;
    }
    case "Windows": {
      return <AiFillAppstore />;
    }
    case "Android": {
      return <IoPhonePortraitOutline />;
    }
  }
};

interface DevicesProps {
  // accesses: ReducedAccess[]
  logs: ReducedLog[];
}

const categorize = (logs: ReducedLog[]) => {
  const resMap: {
    [key: string]: { ua: string; timestamp: number; ip: string };
  } = {};
  for (const l of logs) {
    const d = deviceMap(l.userAgent, l.userAgentPlatform);
    if (!resMap[d]) {
      resMap[d] = {
        ua: l.userAgent,
        timestamp: new Date(l.timestamp).getTime(),
        ip: l.ip,
      };
    } else {
      const compareDate = new Date(l.timestamp).getTime();
      if (resMap[d].timestamp < compareDate) {
        resMap[d].timestamp = compareDate;
        resMap[d].ip = l.ip;
      }
    }
  }
  return resMap;
};

interface DevicesCardProps {
  logs: ReducedLog[];
}

interface EachProps {
  keyName: string;
  device: {
    ua: string;
    timestamp: number;
    ip: string;
  };
  last: boolean;
}

const Each: FC<EachProps> = ({ keyName, device, last }) => {
  const { t } = useClientTranslation(dictDeviceCard);
  const deviceIconBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const [expand, setExpand] = useState(false);
  return (
    <Box w="full">
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={[3, 2]}>
          <Flex
            w="52px"
            h="52px"
            justifyContent="center"
            alignItems="center"
            bg={deviceIconBg}
            rounded="full"
            fontSize={22}
          >
            {whichIcon(keyName)}
          </Flex>
        </GridItem>
        <GridItem colSpan={[9, 10]}>
          <Box mb={2} rounded={10} p={0}>
            <Text fontSize={16} fontWeight={600}>
              {keyName}
            </Text>
            <HStack spacing={1} color="kraikub.blue.500">
              <Link
                fontSize={12}
                fontWeight={800}
                href={`https://who.is/whois-ip/ip-address/${device.ip}`}
              >
                {device.ip}
              </Link>
              <IoIosArrowRoundForward />
            </HStack>
            <Text fontSize={12} opacity={0.6} fontWeight={400} mb={2}>
              {new Date(device.timestamp).toLocaleString()}
            </Text>
            <Collapse in={expand} animateOpacity>
              <Text fontSize={12} opacity={0.7} my={6}>
                {device.ua}
              </Text>
            </Collapse>
            <Box>
              <Button
                variant="link"
                onClick={() => setExpand(!expand)}
                fontSize={10}
                textDecoration="underline"
                textTransform="uppercase"
                opacity={0.8}
              >
                {expand ? t("btn-see-less") : t("btn-see-more")}
              </Button>
            </Box>
          </Box>
          {last ? null : <CustomDivider sx={{ opacity: 0.6 }} />}
        </GridItem>
      </Grid>
    </Box>
  );
};

export const DevicesCard: FC<DevicesCardProps> = ({ logs }) => {
  const { t } = useClientTranslation(dictDeviceCard);
  const catMap = categorize(logs);
  return (
    <Box w="full">
      <Card>
        <Box mb={6}>
          <Heading size="md">{t("header")}</Heading>
        </Box>
        {/* <Button>Learn more about device detection</Button> */}
        <VStack spacing={5}>
          {Object.keys(catMap).map((k, index) => {
            const keyName = k.replaceAll(`"`, "");
            const device = catMap[k];
            return (
              <>
                <Each
                  key={`device-list-${index}`}
                  {...{ keyName, device }}
                  last={index === Object.keys(catMap).length - 1}
                />
              </>
            );
          })}
        </VStack>
      </Card>
    </Box>
  );
};
