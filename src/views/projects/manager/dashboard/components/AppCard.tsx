import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import background from "../../../../../../public/bg-1.png";

interface AppCardProps {
  app: Application;
}

const AppCard: FC<AppCardProps> = ({ app }) => {
  const router = useRouter();
  return (
    <Box
      w="full"
      maxW={["full", "320px"]}
      boxShadow="0 0 6px 1px #00000040"
      rounded={6}
      overflow="hidden"
      cursor="pointer"
      onClick={() => router.push(`/projects/manager/${app.clientId}`)}
      transition="300ms ease"
      _hover={{
        bg: "#00000010",
      }}
    >
      <Box
        h="80px"
        bg="katrade.main"
        backgroundImage={background.src}
        backgroundSize="cover"
        backgroundPosition="center"
      ></Box>
      <Box px={4} py={6}>
        <Heading size="md">{app.appName}</Heading>
        <Text opacity={0.6} mt={2}>
          {app.appDescription}
        </Text>
      </Box>
    </Box>
  );
};
export default AppCard;
