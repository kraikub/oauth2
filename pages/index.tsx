// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Grid,
//   GridItem,
//   Heading,
//   SimpleGrid,
//   Text,
//   useColorModeValue,
//   VStack,
// } from "@chakra-ui/react";
// import type { NextPage } from "next";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import { FC, ReactNode } from "react";
// import { BsArrowUpRight } from "react-icons/bs";
// import { SiAuth0 } from "react-icons/si";
// import { AiOutlineSafety } from "react-icons/ai";
// import { HiIdentification } from "react-icons/hi";
// import { Card } from "../src/components/Card";
// import { FooterShort } from "../src/layouts/FooterShort";
// import StaticNavbar from "../src/layouts/StaticNavbar";
// import { p } from "../src/utils/path";

import { GetStaticProps } from "next";

// interface EachCardProps {
//   title: string;
//   description: string;
//   icon?: ReactNode;
// }

// const EachCard: FC<EachCardProps> = ({ title, description, icon }) => {
//   const iconContainerStyles = {
//     bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
//     rounded: "full",
//     justifyContent: "center",
//     alignItems: "center",
//   };
//   return (
//     <Card>
//       <Grid templateColumns="repeat(12, 1fr)">
//         <GridItem colSpan={4}>
//           {icon ? (
//             <Flex w="58px" h="58px" {...iconContainerStyles}>
//               {icon}
//             </Flex>
//           ) : null}
//         </GridItem>
//         <GridItem colSpan={8}>
//           <Heading size="md" fontWeight={700}>
//             {title}
//           </Heading>
//           <Text mt={4} fontWeight={500} opacity={0.6}>
//             {description}
//           </Text>
//         </GridItem>
//       </Grid>
//     </Card>
//   );
// };

// const Home: NextPage = () => {
//   const router = useRouter();
//   return (
//     <>
//       <Head>
//         <title>Kraikub - Authenticate any KU students.</title>
//       </Head>
//       <Box>
//         <StaticNavbar hideLanguageSelector />
//         <Box minH="100vh">
//           <Container
//             py="15vh"
//             maxW="container.xl"
//             minH="80vh"
//             display="flex"
//             alignItems="center"
//           >
//             <Box w="full">
//               <Box maxW={900}>
//                 <Heading
//                   fontSize={[42, 48, 60, 80]}
//                   letterSpacing="-2px"
//                   fontWeight={500}
//                 >
//                   {"Let's see what you can do with "}
//                   <Box
//                     as="span"
//                     fontWeight={700}
//                     color={useColorModeValue("kraikub.blue.400", "kraikub.blue.200")}
//                   >
//                     KRAIKUB
//                   </Box>
//                 </Heading>
//               </Box>
//               <SimpleGrid
//                 columns={[1, 2, 3]}
//                 w="full"
//                 columnGap={4}
//                 my={20}
//                 rowGap={4}
//               >
//                 <EachCard
//                   title="Sign in with KU"
//                   description="Use your KU account to sign in to any supported websites."
//                   icon={<SiAuth0 size="24px" />}
//                 />
//                 <EachCard
//                   title="Secure & Private"
//                   description="Your university account is more secure with Two Factor Authentication."
//                   icon={<AiOutlineSafety size="30px" />}
//                 />
//                 <EachCard
//                   title="OpenID Connect"
//                   description="For developers, claim your users identity with OpenID Connect standard on our OAuth server."
//                   icon={<HiIdentification size="30px" />}
//                 />
//               </SimpleGrid>
//               <Flex gap={2} mt="60px">
//                 <a href={p.projects}>
//                   <Button size="lg" height="60px" gap={2}>
//                     Try now for free <BsArrowUpRight />
//                   </Button>
//                 </a>
//               </Flex>
//             </Box>
//           </Container>
//         </Box>
//       </Box>
//       <FooterShort contentSize="container.xl" />
//     </>
//   );
// };

// export default Home;

export const getServerSideProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: "/id",
    },
    props: {},
  };
};

const Content = () => null;

export default Content;
