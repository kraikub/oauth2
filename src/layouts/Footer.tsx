import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      py="20px"
      bg="white"
      zIndex={35}
      boxShadow="0 -5px 5px #0000000e"
    >
      <Container size="container.xl" h="full">
        <Heading size="sm" mb="10px">
          โปรดอ่าน!
        </Heading>
        <Text color="#00000090" fontSize="0.8rem">
          พวกเราคือ นิสิตภาควิชาวิศวกรรมศาสตร์คอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์
          เราสร้าง Katrade Login ขึ้นมาเพื่อจุดประสงค์ทางการศึกษาเท่านั้น
          เราไม่มีนโนบายในการเก็บข้อมูลนิสิตที่เป็นผู้ใช้งานใดๆทั้งสิ้น
        </Text>
        <Flex justifyContent="end" alignItems="center" mt="10px" gap={4}>
          <Text fontSize="0.8rem">ต้องการใช้งาน?</Text>
          <Button
            size="sm"
            bg="#00de73"
            color="white"
            _hover={{ bg: undefined }}
            _active={{ bg: undefined }}
            fontWeight={400}
          >
            ส่ง Proposal ของคุณ
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};
export default Footer;
