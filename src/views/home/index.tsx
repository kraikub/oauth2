import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import { FC } from "react";
import Navbar from "../../layouts/Navbar";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import { mapQueryStringToUrl } from "../../../api/utils/query";
import { getSigninUrl } from "../../utils/path";

const HomePage: FC = () => {
  const router = useRouter();
  const handleToSigninPage = () => {
    return router.push(getSigninUrl())
  };
  return (
    <>
      <Navbar />
      <Container maxW="600px" py="20vh" position="relative">
        <Box zIndex={20} position="relative">
          <Heading fontWeight={600} fontSize="24px">
            เข้าสู่ระบบด้วย KU
          </Heading>
          <Heading fontWeight={600} fontSize="50px">
            พัฒนาแอป
            <Box color="katrade.500" as="span">
              ง่ายนิดเดียว
            </Box>
          </Heading>
          <Box mt="80px">
            <Text>
              Accounts API
              ช่วยให้เราสามารถพัฒนาแอปพลิเคชันที่ต้องยืนยันตัวตนการเป็นบุคคลากรของมหาวิทยาลัยเกษตรศาสตร์ได้อย่างง่ายดาย
            </Text>
          </Box>
          <HStack mt={10}>
            <Button colorScheme="katrade" onClick={handleToSigninPage}>
              เริ่มต้นใช้งาน
            </Button>
            <Button colorScheme="gray" gap={2}>
              <FaLock />
              ความปลอดภัยของข้อมูลคุณ
            </Button>
          </HStack>
        </Box>
      </Container>
    </>
  );
};
export default HomePage;
