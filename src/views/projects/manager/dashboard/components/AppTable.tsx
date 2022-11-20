import {
  Heading,
  Box,
  Flex,
  Button,
  VStack,
  Text,
  Center,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useUser } from "../../../../../contexts/User";
import { appService } from "../../../../../services/appService";
import AppCard from "./AppCard";
import { InterWindLoader } from "../../../../../layouts/Loader";
import { MdOutlineAdd } from "react-icons/md";

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
      <VStack py={20} spacing={10}>
        <Heading
          fontWeight={600}
          letterSpacing={-1}
          color="white"
          textShadow="0 0 20px #00000080"
        >
          สร้างแอปพลิเคชันแรกของคุณ
        </Heading>
        <Text
          fontSize={20}
          fontWeight={500}
          color="white"
          textShadow="0 0 20px #00000080"
        >
          ใครๆก็สามารถมาเชื่อมต่อแอปพลิเคชันกับ Kraikub ได้
        </Text>
        <Button
          px="40px"
          h="100px"
          rounded="full"
          fontWeight={300}
          fontSize="20px"
          bg="white"
          color="black"
          _hover={{ bg: undefined, transform: "scale(1.1)" }}
          onClick={() => router.push("/projects/manager/create")}
        >
          เริ่มต้นเลย
        </Button>
      </VStack>
    );
  }

  return (
    <Box py={20}>
      <Box my={8}>
        <Flex justifyContent="space-between">
          <Heading size="lg" mb={2} letterSpacing={-1}>
            Welcome to your apps library
          </Heading>
          {user.appOwned >= user.appQuota ? (
            <Button
              colorScheme="red"
              onClick={() =>
                handleCreateAppClick(user.appOwned >= user.appQuota)
              }
            >
              คุณใช้สิทธิหมดแล้ว
            </Button>
          ) : (
            <Button
              colorScheme="katrade"
              color="black"
              fontWeight={600}
              rounded="full"
              onClick={() =>
                handleCreateAppClick(user.appOwned >= user.appQuota)
              }
            >
              สร้างแอป +
            </Button>
          )}
        </Flex>
        <Box>
          <Text fontSize={14}>ยินดีต้อนรับสู่คลังแอปพลิเคชันของคุณ สร้างแอปพลิเคชันใหม่เพื่อเชื่อต่อแอปพลิเคชั่นของคุณกับ Kraikub ได้เลย</Text>
        </Box>
      </Box>
      <Box py="20px">
        {/* <Text fontWeight={600} fontSize={20}>{user.student.nameTh.split(" ").slice(1).join(" ")}</Text> */}
        <Text fontWeight={600} fontSize={20} mt={4}>
          {user
            ? `คุณสามารถสร้างแอปได้อีก ${user.appQuota - user.appOwned} แอป`
            : ""}
        </Text>
        <Divider my={4} />
        {isLoading ? (
          <Center gap={3} py="40px">
            <InterWindLoader />
          </Center>
        ) : (
          <Flex flexWrap="wrap" gap={4} my={10}>
            {apps.map((app, index) => (
              <AppCard app={app} key={`app-${app.clientId}`} />
            ))}
            <Center display={["none", "flex"]}>
              <IconButton
                aria-label="add-button"
                size="lg"
                fontSize={24}
                rounded="full"
                onClick={() =>
                  handleCreateAppClick(user.appOwned >= user.appQuota)
                }
              >
                <MdOutlineAdd />
              </IconButton>
            </Center>
          </Flex>
        )}
      </Box>
    </Box>
  );
};
export default AppTable;
