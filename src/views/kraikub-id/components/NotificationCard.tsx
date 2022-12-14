import {
  Box,
  Divider,
  Flex,
  Heading,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";
import { useClientTranslation } from "../../../hooks/client-translation";
import { dictNotificationCard } from "../../../translate/kraikubid";

interface NotificationCardProps {
  user: UserWithStudent;
}

interface EachSwitchProps {
  title: string;
  description?: string;
  defaultChecked?: boolean;
}

const EachSwitch: FC<EachSwitchProps> = ({
  title,
  description,
  defaultChecked,
}) => {
  return (
    <Flex gap={3} justifyContent="space-between" w="full">
      <Box>
        <Text fontSize={16} fontWeight={500}>
          {title}
        </Text>
        <Text fontSize={14} fontWeight={400} opacity={0.6}>
          {description}
        </Text>
      </Box>
      <Switch size="lg" isChecked={defaultChecked} colorScheme="teal" mt={2} />
    </Flex>
  );
};

export const NotificationCard: FC<NotificationCardProps> = ({ user }) => {
  const { t } = useClientTranslation(dictNotificationCard)
  return (
    <Box w="full" h="full">
      <Card
        props={{
          h: "full",
        }}
      >
        <Heading size="md">{t("header")}</Heading>
        <CustomDivider />
        <VStack alignItems="start" my={6} spacing={9}>
          <EachSwitch
            title={t("sign-in-activities")}
            description={t("sign-in-activities-description")}
            defaultChecked={user.settings.email.signin}
          />
          <EachSwitch
            title={t("news-from-kraikub")}
            description={t("news-from-kraikub-description")}
            defaultChecked={user.settings.email.news}
          />
        </VStack>
      </Card>
    </Box>
  );
};
