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

interface AppTableProps {
  apps: Application[];
}

const AppTable: FC<AppTableProps> = ({ apps }) => {
  const router = useRouter();
  const { user } = useUser();

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

  if (!apps.length) {
    // No app found
    return (
      <VStack py={20} spacing={10}>
        <Heading fontWeight={500} letterSpacing={-1}>
          สร้างแอปพลิเคชันแรกของคุณ
        </Heading>
        <Text fontSize={20} fontWeight={500}>
          สร้างแอปพลิเคชันเพื่อใช้งาน Sign in with KU
        </Text>
        <Button
          px="40px"
          h="60px"
          rounded="full"
          fontWeight={300}
          fontSize="20px"
          colorScheme="katrade"
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
          <Heading size="lg" mb={4} letterSpacing={-1}>
            Welcome to your App Library
          </Heading>
          {user.appOwned >= user.appQuota ? (
            <Button
              colorScheme="red"
              onClick={() =>
                handleCreateAppClick(user.appOwned >= user.appQuota)
              }
            >
              {"You've used all of your quotas."}
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
              Create +
            </Button>
          )}
        </Flex>
        <Box>
          <Text fontSize={14}>
            Your registered apps will be listed here. Create a new one if you
            are developing your new app.
          </Text>
        </Box>
      </Box>
      <Box py="20px">
        {/* <Text fontWeight={600} fontSize={20}>{user.student.nameTh.split(" ").slice(1).join(" ")}</Text> */}
        <Text fontWeight={600} fontSize={20} mt={4}>
          {user
            ? `You have  ${
                user.appQuota - user.appOwned
              } remaining free app(s).`
            : ""}
        </Text>
        <Divider my={4} />

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
              colorScheme="katrade"
              onClick={() =>
                handleCreateAppClick(user.appOwned >= user.appQuota)
              }
            >
              <MdOutlineAdd />
            </IconButton>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
};
export default AppTable;
