import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { CardContent } from "../../../components/Card";
import { useClientTranslation } from "../../../hooks/client-translation";
import { orgDeleteDict } from "../../../translate/org";

interface DeleteOrgProps {
  org: Organization;
}

export const DeleteOrg: FC<DeleteOrgProps> = ({ org }) => {
  const { t } = useClientTranslation(orgDeleteDict);
  return (
    <CardContent>
      <Text fontWeight={600} fontSize={12} textTransform="uppercase" opacity={0.6}>
        {t("top-title")}
      </Text>
      <Heading size="md" mt={2}>
        {t("delete")} {org.orgName}
      </Heading>
    </CardContent>
  );
};
