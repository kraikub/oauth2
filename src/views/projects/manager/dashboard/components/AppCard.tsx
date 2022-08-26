import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { Application } from "../../../../../../db/schema/application";
import background from "../../../../../../public/bg-1.png";

interface AppCardProps {
  app: Application;
}

const AppCard: FC<AppCardProps> = ({ app }) => {
  const router = useRouter();
  return (
    <Box
      w="full"
      maxW="380px"
      boxShadow="0 10px 10px #00000016"
      rounded={6}
      overflow="hidden"
      cursor="pointer"
      onClick={() => router.push(`/projects/manager/${app.clientId}`)}
    >
      <Box
        minH="60px"
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
