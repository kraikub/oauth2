import { Badge, Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { p } from "../../../../../utils/path";

interface AppCardProps {
  app: Application;
}

const AppCard2: FC<AppCardProps> = ({ app }) => {
  const router = useRouter();

  const bgWhenActive = useColorModeValue("blackAlpha.100", "whiteAlpha.100")
  return (
    <Box
      w="full"
      rounded={6}
      overflow="hidden"
      cursor="pointer"
      onClick={() => router.push(`${p.projects}/${app.clientId}`)}
      boxSizing="border-box"
      transition="200ms ease"
      _hover={{
        bgColor: bgWhenActive,
      }}
      
    >
      <Box p={4}>
        <Heading size="sm" textTransform="uppercase">{app.appName}</Heading>
        <Text mt={1} fontSize={14} opacity={0.8}>
          {app.appDescription}
        </Text>
      </Box>
    </Box>
  );
};
export default AppCard2;
