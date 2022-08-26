import { Box, Container, Heading } from "@chakra-ui/react";
import { FC } from "react";
import background from "../../public/bg-2.png";
import StaticNavbar from "./StaticNavbar";
interface ArticleTemplateProps {
  children?: any;
  title?: string;
}

export const ArticleTemplate: FC<ArticleTemplateProps> = ({
  children,
  title,
}) => {
  return (
    <>
      <StaticNavbar />
      <Box
        minH="220px"
        bgImage={background.src}
        bgSize="cover"
        bgPosition="center"
      ></Box>
      <Container maxW="container.lg" py="40px">
        <Heading size="xl" mb={16}>
          {title}
        </Heading>
        <Box>{children}</Box>
      </Container>
    </>
  );
};
