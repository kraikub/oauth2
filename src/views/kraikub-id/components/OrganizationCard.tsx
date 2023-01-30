import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { Card, CardContent } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";
import { useClientTranslation } from "../../../hooks/client-translation";
import { orgCardDict } from "../../../translate/org-card";

interface OrganizationCardProps {
  user: UserWithExtra;
}

export const OrganizationCard: FC<OrganizationCardProps> = ({ user }) => {
  const { t } = useClientTranslation(orgCardDict);
  const bgImage =
    "https://img.freepik.com/free-psd/3d-character-young-people-with-business-concept_1150-64177.jpg?w=2000&t=st=1675068015~exp=1675068615~hmac=c99156bc05e816515c04d343867dbaa37b0905d680d0189aa86fbfedf0594874";
  return (
    <Card
      props={{
        w: "full",
        p: 0,
        overflow: "hidden",
      }}
    >
      {user.orgId ? (
        <CardContent>
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
                  <Button variant="outline" w="full">
                    {t("btn-see-more")}
                  </Button>
                </a>
              </Link>
            </Box>
          </VStack>
        </CardContent>
      ) : (
        <CardContent
          props={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "260px",
            position: "relative",
            color: "white",
          }}
        >
          <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            p={4}
            bg="blackAlpha.200"
          >
            <VStack
              h="full"
              w="full"
              alignItems="start"
              justifyContent="space-between"
              pt={4}
            >
              <Box maxW="60%">
                <Heading size="md">{t("title-no-org")}</Heading>
                <Text mt={1} opacity={0.8}>
                  {t("title-no-org-text")}
                </Text>
              </Box>
              <Box w="full">
                <Link href="/id/organization">
                  <a>
                    <Button
                      variant="solid"
                      w="full"
                      bg="whiteAlpha.800"
                      _hover={{ bg: "whiteAlpha.900" }}
                      color="black"
                    >
                      {t("btn-see-more")}
                    </Button>
                  </a>
                </Link>
              </Box>
            </VStack>
          </Box>
        </CardContent>
      )}
    </Card>
  );
};
