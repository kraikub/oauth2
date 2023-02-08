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
import { Card, CardContent } from "../../../components/Card";
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
        <Text fontWeight={600}>{title}</Text>
        <Text fontWeight={400} opacity={0.6}>
          {description}
        </Text>
      </Box>
      <Switch
        size="md"
        isChecked={defaultChecked}
        colorScheme="kraikub.green.always"
        mt={2}
      />
    </Flex>
  );
};

export const NotificationCard: FC<NotificationCardProps> = ({ user }) => {
  const { t } = useClientTranslation(dictNotificationCard);
  return (
    <Box w="full">
      <Card
        props={{
          p: 0,
          h: "full",
        }}
      >
        <CardContent>
          <Heading size="md">{t("header")}</Heading>
        </CardContent>
        <CustomDivider sx={{ my: 0 }} />
        <CardContent>
          <VStack alignItems="start" spacing={5}>
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
        </CardContent>
      </Card>
    </Box>
  );
};
