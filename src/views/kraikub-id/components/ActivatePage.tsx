import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC, FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SimpleFadeIn } from "../../../components/animations/SimpleFadeIn";
import { SimpleFadeInRight } from "../../../components/animations/SimpleFadeInRight";
import { Card } from "../../../components/Card";
import { ClientRender } from "../../../components/ClientRender";
import { useUser } from "../../../contexts/User";
import { useClientTranslation } from "../../../hooks/client-translation";
import { useOnClient } from "../../../hooks/on-client";
import { internalServiceApi } from "../../../services/internalService";
import {
  dictSetupPage1,
  dictSetupPage2,
  dictSetupPage3,
} from "../../../translate/kraikubid";
import { PageWrapper } from "./PageWrapper";

interface SubpageProps {
  next: () => void;
  back: () => void;
  lastPage: number;
  page: number;
}

const Page1: FC<SubpageProps> = ({ next, lastPage, page }) => {
  const { t } = useClientTranslation(dictSetupPage1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onEmailFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await internalServiceApi.verifyEmail(email);
    next();
    setLoading(false);
  };

  return (
    <PageWrapper {...{ lastPage, page }}>
      <form onSubmit={onEmailFormSubmit}>
        <VStack alignItems="start" spacing={6} w="full">
          <Heading>{t("header")}</Heading>
          <Text fontSize={24} opacity={0.6}>
            {t("description")}
          </Text>
          <Input
            variant="solid"
            type="email"
            size="lg"
            h="60px"
            fontSize={20}
            fontWeight={600}
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            required
          />
          <ButtonGroup justifyContent="space-between" w="full" py={6}>
            <Link href="/a">
              <a>
                <Button size="lg">{t("btn-cancel")}</Button>
              </a>
            </Link>
            <Button size="lg" type="submit" isLoading={loading}>
              {t("btn-next")}
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </PageWrapper>
  );
};

const Page2: FC<SubpageProps> = ({ back, next, lastPage, page }) => {
  const { t } = useClientTranslation(dictSetupPage2);
  const getIsVerified = async () => {
    const { data } = await internalServiceApi.isVerified();
    if (data.payload.verified) {
      next();
    }
  };

  useEffect(() => {
    var intv = setInterval(() => {
      getIsVerified();
    }, 4000);
    return () => clearInterval(intv);
  }, []);

  return (
    <PageWrapper {...{ lastPage, page }}>
      <VStack alignItems="start" spacing={6} w="full">
        <Heading>{t("header")}</Heading>
        <Text fontSize={24}>
          <Box as="span" opacity={0.6}>
            {t("description-1")}{" "}
          </Box>
          <Box
            as="span"
            fontWeight={600}
            color={useColorModeValue("teal.400", "teal.200")}
          >
            {t("description-2")}
          </Box>
        </Text>
        <ButtonGroup py={8} flexWrap="wrap" spacing={[0, 3]} gap={3}>
          <Button size="lg" w={["full", "auto"]} onClick={back}>
            <IoIosArrowRoundBack size="22px" />
            {t("btn-back")}
          </Button>
          <Button size="lg" w={["full", "auto"]}>
            {t("btn-resend")}
          </Button>
        </ButtonGroup>
        <Text fontSize={14} opacity={0.6}>
          {t("continue")}
        </Text>
      </VStack>
    </PageWrapper>
  );
};

const Page3: FC<SubpageProps> = ({ page, lastPage }) => {
  const { t } = useClientTranslation(dictSetupPage3);
  return (
    <PageWrapper {...{ lastPage, page }}>
      <Container maxW="container.sm">
        <VStack alignItems="start" spacing={6} w="full">
          <Heading>{t("header")}</Heading>
          <Text fontSize={24}>
            <Box as="span" opacity={0.6}>
              {t("description")}
            </Box>
          </Text>

          <VStack py={14} spacing={8} w="full">
            <Card
              props={{
                w: "full",
              }}
            >
              <Heading size="md">{t("card-1-header")}</Heading>
              <Text fontSize={18} opacity={0.6} mt={2}>
                {t("card-1-body")}
              </Text>
            </Card>
            <Card
              props={{
                w: "full",
              }}
            >
              <Heading size="md">{t("card-2-header")}</Heading>
              <Text fontSize={18} opacity={0.6} mt={2}>
                {t("card-2-body")}
              </Text>
            </Card>
          </VStack>

          <Link href="/id">
            <a>
              <Button size="lg" h="80px" colorScheme="teal" fontSize={20}>
                {t("btn-finish")}
              </Button>
            </a>
          </Link>
        </VStack>
      </Container>
    </PageWrapper>
  );
};

export const ActivatePage = () => {
  const maxPage = 3;
  const minPage = 1;
  const [page, setPage] = useState(minPage);
  const [lastPage, setLastPage] = useState(minPage);
  const { user } = useUser();

  const next = () => {
    if (page + 1 > maxPage) return;
    setLastPage(page);
    setPage(page + 1);
  };

  const back = () => {
    if (page + 1 < minPage) return;
    setLastPage(page);
    setPage(page - 1);
  };

  const which = () => {
    switch (page) {
      case 1: {
        return <Page1 {...{ next, back, lastPage, page }} />;
      }
      case 2: {
        return <Page2 {...{ next, back, lastPage, page }} />;
      }
      case 3: {
        return <Page3 {...{ next, back, lastPage, page }} />;
      }
      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    if (user?.personalEmail) {
      setPage(3);
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <ClientRender>
      <Container
        maxW="container.md"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        py="12vh"
      >
        <SimpleFadeInRight>{which()}</SimpleFadeInRight>
      </Container>
    </ClientRender>
  );
};
