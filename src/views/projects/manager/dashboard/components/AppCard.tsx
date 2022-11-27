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
      rounded={6}
      overflow="hidden"
      cursor="pointer"
      onClick={() => router.push(`/projects/manager/${app.clientId}`)}
      transition="300ms ease"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="gray.300"
      _hover={{
        boxShadow: "0 0 15px #00000020",
      }}
      
    >
      <Box px={4} py={6}>
        <Text fontSize={16} fontWeight={500}>{app.appName}</Text>
        <Text opacity={0.6} mt={2} fontSize={12}>
          {app.appDescription}
        </Text>
      </Box>
    </Box>
  );
};
export default AppCard;
