import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ArticleTemplate } from "../src/layouts/ArticleTemplate";
import { Focus } from "../src/layouts/Focus";
import { BsInstagram, BsGithub } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
interface CardProps {
  title: string;
  description: string;
  price: number | "free";
}

const Card: FC<CardProps> = ({ title, description, price }) => {
  return (
    <Box
      boxShadow="0 10px 10px #00000016"
      rounded={14}
      overflow="hidden"
      w="100%"
      maxW="380px"
    >
      <Box minH="20px" bg="katrade.main"></Box>
      <Box px={8} py={10}>
        <Heading size="lg" mb={4} color="katrade.main">
          {title}
        </Heading>
        <Text opacity={0.6} mb={8}>
          {description}
        </Text>
        <Flex justifyContent="end">
          <Heading size="md">
            {price === "free" ? "FREE" : `THB ${price}`}
          </Heading>
        </Flex>
      </Box>
    </Box>
  );
};

const Pricing: FC = () => {
  return (
    <ArticleTemplate title="ราคาและการใช้งาน kraikub">
      <Heading size="md" mb={5}>
        โปรดอ่าน
      </Heading>
      <Text fontSize={18} lineHeight={2}>
        เนื่องจากแพลทฟอร์มใครคับ (Kraikub)
        นั้นถูกสร้างขึ้นมาด้วยวัตถุประสงค์ทางการศึกษาโดย นิสิต/นักศึกษา
        คณะวิศวกรรมศาสตร์ สาขาคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์{" "}
        <Focus>
          โดยไม่มีวัตถุประสงค์ในการใช้ข้อมูลส่วนบุคคลของ นิสิต/นักศึกษา
          มหาวิทยาลัยเกษตรศาสตร์ เพื่อนำไปแสวงหาผลกำไรทั้งทางตรงและทางอ้อม
        </Focus>
        {" "}Kraikub ไม่มีแหล่งเงินทุนสนับสนุนแต่อย่างใด
        บริการที่ทุกท่านกำลังใช้งานถูกสร้างขึ้นมาเพื่อให้เป็นบริการที่ทุกคน(นิสิต/นักศึกษา
        มหาวิทยาลัยเกษตรศาสตร์) สามารถเข้าถึงได้โดยพื้นฐาน
        เราใช้ทรัพยากรที่ต้นทุนต่ำที่สุดเพื่อทำให้แพลทฟอร์มของเราเป็นบริการฟรีสำหรับผู้ใช้งานทั่วไปทุกคน
        เช่นการใช้ Cloud Provider แบบฟรี ทำให้เราถูกจำกัดความเร็วของการสื่อสารกับ Cloud
        หรือการใช้ Database แบบฟรีทำให้เราเก็บข้อมูลได้น้อยเป็นต้น
        ดังนั้นเราจึงจำเป็นต้องเก็บค่าบริการกับนักพัฒนาที่ต้องการใช้บริการและทรัพยากรของเราเกินโควตาที่เรากำหนดให้ใช้ฟรีโดยคิดค่าบริการดังนี้
      </Text>
      <Flex flexWrap="wrap" gap={4} my="60px">
        <Card
          title="5 Apps"
          description="คุณสามารถสร้าง application ได้ไม่เกิน 5 app"
          price="free"
        />
        <Card
          title="20 Apps"
          description="คุณสามารถสร้าง application ได้ไม่เกิน 20 app"
          price={399}
        />
        <Card
          title="50 Apps"
          description="คุณสามารถสร้าง application ได้ไม่เกิน 50 app"
          price={699}
        />
      </Flex>
      <Text textAlign="center">
        หมายเหตุ: ซื้อเพียงครั้งเดียวและสามารถใช้งานได้ตลอดไป
      </Text>
      <Box my="40px">
        <Heading size="lg" mb={6}>
          หากสนใจ โปรดติดต่อ
        </Heading>
        <Flex alignItems="center" gap={3} fontWeight={600} my={2}>
          <BsInstagram size="20px" /> @beamuuuu
        </Flex>
        <Flex alignItems="center" gap={3} fontWeight={600} my={2}>
          <MdOutlineEmail size="20px" /> nutchanon.chant@ku.th หรือ
          beamuonly@gmail.com
        </Flex>
        <Flex alignItems="center" gap={3} fontWeight={600} my={2}>
          <BsGithub size="20px" /> nutchanonc
        </Flex>
      </Box>
    </ArticleTemplate>
  );
};
export default Pricing;
