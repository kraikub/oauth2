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
import { FC } from "react";

const AppTable: FC = () => {
  const router = useRouter();
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
              <Th color="white">Created Date</Th>
              <Th color="white" isNumeric>API Calls</Th>
              <Th color="white" isNumeric>Bridge API Calls</Th>
            </Tr>
          </Thead>
          <Tbody fontWeight={500} fontSize={14}>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>30.48</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>0.91444</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AppTable;
