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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Application } from "../../../../../../db/schema/application";
import { appService } from "../../../../../services/appService";

interface RowProps {
  app: Application;
}

const Row: FC<RowProps> = ({ app }) => {
  const router = useRouter()
  return (
    <Tr cursor="pointer" _hover={{bg: "gray.50"}} onClick={() => router.push(`/projects/manager/${app.clientId}`)}>
      <Td>{app.clientId}</Td>
      <Td>{app.appName}</Td>
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

  return (
    <Box my={20}>
      <Flex justifyContent="space-between" my={8}>
        <Heading size="md" fontWeight={500} mb={10}>
          แอปของคุณ
        </Heading>
        <Button
          colorScheme="katrade"
          _hover={{ transform: "scale(1.05)" }}
          rounded="full"
          transition="300ms ease"
          onClick={() => router.push("/projects/manager/create")}
        >
          + สร้างแอป
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple" border="1px solid" borderColor="gray.300">
          <TableCaption>คุณเหลือสิทธิ์การสร้างแอปอีก 5 ครั้ง</TableCaption>
          <Thead bg="katrade.600">
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
          <Tbody fontWeight={500} fontSize={14}>
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
