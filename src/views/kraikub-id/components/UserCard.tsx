import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "../../../components/Card";
import { useClientTranslation } from "../../../hooks/client-translation";
import { dictUserCard } from "../../../translate/kraikubid";

interface UserCardProps {
  user: UserWithStudent;
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
  const { t } = useClientTranslation(dictUserCard)
  return (
    <Grid templateColumns="repeat(12, 1fr)" columnGap={4} rowGap={3}>
      <GridItem colSpan={[12, 10]}>
        <Card props={{ h: "full" }}>
          <VStack
            justifyContent="space-between"
            alignItems="start"
            w="full"
            h="full"
          >
            <Box>
              <HStack spacing={4}>
                <Heading size="md">{user.student.nameEn}</Heading>
                <Badge colorScheme="teal" rounded={6}>
                  {t("student")}
                </Badge>
              </HStack>
              <Text fontWeight={600} fontSize={18} opacity={0.6} mt={2}>
                {user.student.nameTh}
              </Text>
            </Box>
          </VStack>
        </Card>
      </GridItem>
      <GridItem colSpan={[12, 2]} display={["none", "block"]}>
        <Avatar size="full" src={user.profileImageUrl} borderRadius="12px" />
      </GridItem>
    </Grid>
  );
};
