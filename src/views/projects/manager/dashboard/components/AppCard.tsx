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
      bg="gray.100"
      rounded={10}
      overflow="hidden"
      cursor="pointer"
      onClick={() => router.push(`/projects/manager/${app.clientId}`)}
      transition="300ms ease"
      _hover={{
        boxShadow: "0px 3px 7px 2px #00000020",
      }}
    >
      <Box
        h="20px"
        // backgroundImage={background.src}
        // backgroundSize="cover"
        // backgroundPosition="center"
        bg="katrade.500"
        position="relative"
      >
        {/* <Box
          position="absolute"
          bg="#ffffff70"
          backdropFilter="blur(40px)"
          top={0}
          bottom={0}
          left={0}
          right={0}
        ></Box> */}
      </Box>
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
