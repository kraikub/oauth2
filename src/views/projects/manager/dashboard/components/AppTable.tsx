import {
  Heading,
  Box,
  Flex,
  Button,
  VStack,
  Text,
  Center,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Application } from "../../../../../../db/schema/application";
import { useUser } from "../../../../../contexts/User";
import { appService } from "../../../../../services/appService";
import AppCard from "./AppCard";
import background from "../../../../../../public/bg-1.png";
import { InterWindLoader } from "../../../../../layouts/Loader";
interface RowProps {
  app: Application;
}

const AppTable: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [apps, setApps] = useState<Application[]>([]);

  const getApps = async () => {
    setIsLoading(true);
    const access = localStorage.getItem("access");
    if (!access) return alert("Token not found!");
    const a = await appService.getApplications(access);
    if (!a) return alert("Fetch apps failed!");
    setApps(a);
    setIsLoading(false);
  };

  useEffect(() => {
    getApps();
  }, []);

  const handleCreateAppClick = (limit: boolean) => {
    if (!limit) {
      router.push("/projects/manager/create");
    } else {
      router.push("/pricing");
    }
  };

  if (!user) {
    return <InterWindLoader />;
  }

  if (!apps.length && !isLoading) {
    // No app found
    return (
      <VStack my={20} spacing={10}>
        <Heading fontWeight={600} letterSpacing={-1}>
          Create your first app
        </Heading>
        <Text fontSize={20} fontWeight={500}>
          Make an idea comes true now!
        </Text>
        <Button
          w="80px"
          h="80px"
          rounded="full"
          fontWeight={300}
          fontSize="50px"
          bg="katrade.main"
          color="white"
          _hover={{ bg: undefined, transform: "scale(1.1)" }}
          onClick={() => router.push("/projects/manager/create")}
        >
          +
        </Button>
      </VStack>
    );
  }

  return (
    <Box my={20}>
      <Flex justifyContent="space-between" my={8}>
        <Heading size="lg" mb={10} letterSpacing={-1}>
          Your Apps
        </Heading>
        <Button
          colorScheme={
            user.appOwned >= user.appQuota ? "red" : "katrade.scheme.fix"
          }
          _hover={{ transform: "scale(1.05)" }}
          rounded="full"
          transition="300ms ease"
          onClick={() => handleCreateAppClick(user.appOwned >= user.appQuota)}
        >
          {user.appOwned >= user.appQuota ? "Upgrade plan" : "+ Create app"}
        </Button>
      </Flex>
      <Box
        py="60px"
        px={10}
        backgroundImage={background.src}
        backgroundSize="cover"
        backgroundPosition="center"
        rounded={10}
        color="white"
      >
        <Heading size="xl">Hi {user.firstNameEn}</Heading>
        <Heading size="xl" mt={1}>Let{"'"}s build something.</Heading>
        <Text fontWeight={600} fontSize={20} mt={4}>
          {user
            ? `You have ${user.appQuota - user.appOwned} quota(s) left.`
            : ""}
        </Text>
      </Box>
      {isLoading ? (
        <Center gap={3} py="40px">
          <InterWindLoader />
        </Center>
      ) : (
        <Flex flexWrap="wrap" gap={4} my={20}>
          {apps.map((app, index) => (
            <AppCard app={app} key={`app-${app.clientId}`} />
          ))}
        </Flex>
      )}
    </Box>
  );
};
export default AppTable;
