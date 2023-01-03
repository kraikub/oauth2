import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { appConfig } from "../../../../api/config/app";
import { Card } from "../../../components/Card";
import { FooterShort } from "../../../layouts/FooterShort";

interface UserSelectorProps {
  user: FullUserData;
  reject: () => void;
  next: () => void;
  loading: boolean;
}

export const UserSelector: FC<UserSelectorProps> = ({
  user,
  reject,
  next,
  loading,
}) => {
  const { t } = useTranslation("signin");
  return (
    <>
      <Box width="full">
        <Heading size="md" mb="30px">
          {t("account-header")}
        </Heading>
        <Text fontSize={14}>{t("account-description")}</Text>
        <Card
          props={{
            my: 3,
            rounded: 16,
            boxShadow: "none",
          }}
        >
          <Flex width="full" gap={4}>
            <Box>
              <Image
                src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
                alt="account-owner-profile-image"
                w={50}
                rounded="full"
              ></Image>
            </Box>
            <Box>
              <Text fontWeight={600}>
                {user.student.nameEn.split(" ").splice(1).join(" ")}
              </Text>
              <Text fontWeight={400} fontSize={14} opacity={0.7}>
                {user.student.nameTh.split(" ").splice(1).join(" ")}
              </Text>
            </Box>
          </Flex>
        </Card>
        <ButtonGroup
          justifyContent="end"
          width="full"
          my={4}
          alignItems="center"
        >
          <Button variant="ghost" fontSize={14} onClick={reject}>
            {t("account-btn-no")}
          </Button>
          <Button
            colorScheme="teal"
            fontWeight={600}
            onClick={next}
            isLoading={loading}
          >
            {t("account-btn-yes")}
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};
