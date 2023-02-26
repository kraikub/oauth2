import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { appConfig } from "../../../../api/config/app";

interface LangButtonProps {
  children?: any;
  onClick: () => void;
}

const LangButton: FC<LangButtonProps> = (props) => {
  return (
    <AspectRatio ratio={1 / 1}>
      <Button
        rounded={12}
        variant="outline"
        borderColor="gray.400"
        fontSize={22}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </AspectRatio>
  );
};

export const LangSetup: FC<SteperProps> = ({ next }) => {
  const [cookie, setCookie] = useCookies(["LANG"]);
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const setLanguage = (l: string) => {
    setCookie("LANG", l, { maxAge: appConfig.cookieMaxAge });
    // router.push(router.asPath, router.asPath, { locale: l });
    location.reload();
  };

  useEffect(() => {
    if (cookie.LANG) {
      next();
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <Box w="100%">
      <VStack spacing={3}>
        <Heading size="lg">เลือกภาษาที่ต้องการใช้งาน</Heading>
        <Heading size="md">Choose your preferred language</Heading>
      </VStack>
      <Container maxWidth="400px" my={10}>
        <SimpleGrid columns={2} spacing={2}>
          <LangButton onClick={() => setLanguage("th")}>ไทย</LangButton>
          <LangButton onClick={() => setLanguage("en")}>English</LangButton>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
