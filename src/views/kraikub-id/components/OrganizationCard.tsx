import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { Card } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";
import { useClientTranslation } from "../../../hooks/client-translation";
import { orgCardDict } from "../../../translate/org-card";

interface OrganizationCardProps {
  user: UserWithExtra;
}

export const OrganizationCard: FC<OrganizationCardProps> = ({ user }) => {
  const { t } = useClientTranslation(orgCardDict);

  return (
    <Card
      props={{
        w: "full",
      }}
    >
      <Heading size="md">{t("title")}</Heading>
      <VStack spacing={4} mt={4} alignItems="start">
        <AvatarGroup max={6} size="sm">
          {user.roles?.map((e, index) => {
            return (
              <Avatar
                name={e.user.fullName}
                src={e.user.profileImageUrl}
                key={`user-in-org-${index}`}
              />
            );
          })}
        </AvatarGroup>
        <Box w="full">
          <Link href="/id/organization">
            <a>
              <Button variant="solid" w="full">
                {t("btn-see-more")}
              </Button>
            </a>
          </Link>
        </Box>
      </VStack>
    </Card>
  );
};
