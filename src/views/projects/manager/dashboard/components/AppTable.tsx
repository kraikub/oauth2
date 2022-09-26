import {
  Heading,
  Box,
  Flex,
  Button,
  VStack,
  Text,
  Center,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useUser } from "../../../../../contexts/User";
import { appService } from "../../../../../services/appService";
import AppCard from "./AppCard";
import background from "../../../../../../public/bg-1.png";
import { InterWindLoader } from "../../../../../layouts/Loader";
import { MdOutlineAdd } from "react-icons/md";
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
    const a = await appService.getApplications();
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
          สร้างแอปพลิเคชันแรกของคุณ
        </Heading>
        <Text fontSize={20} fontWeight={500}>
          ใครๆก็สามารถมาสร้างแอปพลิเคชันกับ Kraikub ได้
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
        แอปพลิเคชันของคุณ
        </Heading>
        <Button
          colorScheme={
            user.appOwned >= user.appQuota ? "red" : "katrade.scheme.fix"
          }
          _hover={{ transform: "scale(1.05)" }}
          rounded={12}
          transition="300ms ease"
          size="lg"
          onClick={() => handleCreateAppClick(user.appOwned >= user.appQuota)}
        >
          {user.appOwned >= user.appQuota ? "คุณใช้สิทธิหมดแล้ว" : "สร้างแอป"}
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
        <Heading size="xl">{user.student.nameTh}</Heading>
        <Text fontWeight={600} fontSize={20} mt={4}>
          {user
            ? `คุณสามารถสร้างแอปได้อีก ${user.appQuota - user.appOwned} แอป`
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
          <Center display={["none", "flex"]}>
            <IconButton aria-label="add-button" size="lg" rounded="full" onClick={() => handleCreateAppClick(user.appOwned >= user.appQuota)}>
              <MdOutlineAdd />
            </IconButton>
          </Center>
        </Flex>
      )}
    </Box>
  );
};
export default AppTable;
