import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import Navbar from "../../layouts/Navbar";

const HomePage: FC = () => {
  return (
    <>
      <Navbar />
      <Container maxW="container.sm" py="20vh">
          <Box>
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
            <Button
              mt="60px"
              h="70px"
              w="full"
              bg="gray.100"
              color="gray.600"
              _hover={{ bg: undefined }}
              _active={{ bg: undefined }}
              fontSize="1.2rem"
              fontWeight={500}
              rounded={16}
            >
              ส่ง Proposal
            </Button>
            <Button
              mt="20px"
              h="70px"
              w="full"
              bg="#00de73"
              color="white"
              _hover={{ bg: undefined }}
              _active={{ bg: undefined }}
              fontSize="1.2rem"
              fontWeight={500}
              rounded={16}
            >
              ดูวิธีการใช้งาน
            </Button>
            
          </Box>
      </Container>
    </>
  );
};
export default HomePage;
