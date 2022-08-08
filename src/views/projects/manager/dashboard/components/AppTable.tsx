import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Box,
  Flex,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Application } from "../../../../../../db/schema/application";
import { appService } from "../../../../../services/appService";

interface RowProps {
  app: Application;
}

const Row: FC<RowProps> = ({ app }) => {
  const router = useRouter();
  return (
    <Tr
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      onClick={() => router.push(`/projects/manager/${app.clientId}`)}
    >
      <Td>{app.clientId}</Td>
      <Td fontWeight={600}>{app.appName}</Td>
      <Td>{app.appType}</Td>
      <Td isNumeric>0</Td>
      <Td isNumeric>0</Td>
    </Tr>
  );
};

const AppTable: FC = () => {
  const router = useRouter();

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

  if (!apps.length && !isLoading) {
    // No app found
    return (
      <VStack my={20} spacing={10}>
        <Heading fontWeight={600} letterSpacing={-1}>
          Create your first app
        </Heading>
        <Text fontSize={20} fontWeight={500}>
          Make your idea comes true now!
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
        <Heading size="lg" fontWeight={500} mb={10} letterSpacing={-1}>
          Your Apps
        </Heading>
        <Button
          colorScheme="katrade.scheme.fix"
          _hover={{ transform: "scale(1.05)" }}
          rounded="full"
          transition="300ms ease"
          onClick={() => router.push("/projects/manager/create")}
        >
          + Create an app
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple" border="1px solid" borderColor="gray.300">
          <TableCaption>Apps quota limits are free during beta version.</TableCaption>
          <Thead bg="katrade.main">
            <Tr>
              <Th color="white">Client ID</Th>
              <Th color="white">Name</Th>
              <Th color="white">Type</Th>
              <Th color="white" isNumeric>
                API Calls
              </Th>
              <Th color="white" isNumeric>
                Bridge API Calls
              </Th>
            </Tr>
          </Thead>
          <Tbody fontWeight={400} fontSize={14}>
            {apps.map((app, index) => (
              <Row app={app} key={`app-${app.clientId}`} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AppTable;
