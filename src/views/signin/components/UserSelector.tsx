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
import { CustomDivider } from "../../../components/CustomDivider";

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
        <Text fontSize={14} opacity={0.7}>{t("account-description")}</Text>
        <Flex width="full" gap={4} mt={8}>
          <Box>
            <Avatar
              src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
              size="md"
              rounded="full"
            />
          </Box>
          <Box pt={1}>
            <Text fontWeight={600}>{user.fullName}</Text>
            <Text fontWeight={400} fontSize={14} opacity={0.7}>
              @{user.username}
            </Text>
          </Box>
        </Flex>
        <CustomDivider />
        <ButtonGroup
          justifyContent="end"
          width="full"
          mt={1}
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
