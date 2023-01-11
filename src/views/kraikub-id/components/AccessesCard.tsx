import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";
import { useClientTranslation } from "../../../hooks/client-translation";
import { dictAccessesCard } from "../../../translate/kraikubid";

interface AccessesCardProps {
  accesses: ReducedAccess[];
}

interface EachProps {
  access: ReducedAccess;
}

const Each: FC<EachProps> = ({ access }) => {
  const { t } = useClientTranslation(dictAccessesCard)
  return (
    <HStack w="full" justifyContent="space-between">
      <HStack spacing={[0, 4]}>
        <Center
          display={["none", "flex"]}
          w="40px"
          h="40px"
          bg="linear-gradient(155deg, rgba(0,114,154,1) 0%, rgba(0,162,119,1) 100%)"
          textTransform="uppercase"
          color="white"
          fontWeight={600}
          fontSize={20}
          rounded={8}
        >
          {access.app.length ? access.app[0].appName[0] : ""}
        </Center>
        <Box>
          <Heading size="sm">{access.app.length ? access.app[0].appName : "Unknown"}</Heading>
          <Text fontSize={12} fontWeight={600} opacity={0.6} mt={2}>
            {t("at-time")} {new Date(access.createdAt).toString()}
          </Text>
        </Box>
      </HStack>
      {/* <Button>Remove access</Button> */}
    </HStack>
  );
};

export const AccessesCard: FC<AccessesCardProps> = ({ accesses }) => {
  const { t } = useClientTranslation(dictAccessesCard)
  return (
    <Card
      props={{
        w: "full",
      }}
    >
      <Heading size="md">{t("header")}</Heading>
      <CustomDivider />
      <VStack spacing={5} my={10}>
        {accesses.map((access, index) => {
          return <Each key={`access-${index}`} access={access} />;
        })}
      </VStack>
    </Card>
  );
};
