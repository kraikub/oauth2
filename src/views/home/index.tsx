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
import appIcon from "../../../public/app-icon-white.svg";
const HomePage: FC = () => {
  return (
    <>
      <Navbar />
      <Container maxW="600px" py="20vh" position="relative">
        <Box zIndex={20} position="relative">
          <Heading fontWeight={600} fontSize="24px">
            เครื่องมือล็อกอินสำหรับ KU
          </Heading>
          <Heading fontWeight={600} fontSize="50px">
            พัฒนาแอป
            <Box color="#00de73" as="span">
              ง่ายนิดเดียว
            </Box>
          </Heading>
          <Box mt="80px">
            <Text>
              หากคุณสนใจที่จะใช้ Katrade Login ลองส่ง Proposal
              ของคุณมาให้พวกเราตรวจทานดูก่อนสิ
            </Text>
          </Box>
          <HStack mt={10}>
            <Button
              bg="gray.100"
              color="gray.600"
              _hover={{ bg: undefined }}
              _active={{ bg: undefined }}
              fontSize="0.9rem"
              fontWeight={400}
              rounded={10}
            >
              ส่ง Proposal
            </Button>
            <Button
              bg="#00de73"
              color="white"
              _hover={{ bg: undefined }}
              _active={{ bg: undefined }}
              fontSize="0.9rem"
              fontWeight={400}
              rounded={10}
            >
              ดูวิธีการใช้งาน
            </Button>
          </HStack>
        </Box>        
      </Container>
    </>
  );
};
export default HomePage;
