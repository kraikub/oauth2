import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { appConfig } from "../../../../api/config/app";
import { Card } from "../../../components/Card";

interface UserSelectorProps {
  user: UserWithStudent;
  reject: () => void;
  next: () => void;
  loading: boolean;
  setSigninMethod: Dispatch<SetStateAction<SignInMethodType>>;
}

export const UserSelector: FC<UserSelectorProps> = ({
  user,
  reject,
  next,
  loading,
  setSigninMethod,
}) => {
  const { t } = useTranslation("signin");
  useEffect(() => {
    setSigninMethod("credential");
  }, []);
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
              <Avatar
                src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
                size="lg"
                rounded="full"
              />
            </Box>
            <Box pt={1}>
              <Text fontWeight={600}>
                {user.fullName}
              </Text>
              <Text fontWeight={400} fontSize={14} opacity={0.7}>
                @{user.username}
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
            colorScheme="kraikub.green.always"
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
