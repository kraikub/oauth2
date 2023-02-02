import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardContent } from "../../../components/Card";
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
  const { t } = useClientTranslation(dictAccessesCard);
  return (
    <CardContent
      props={{
        w: "full",
        py: 2,
        cursor: "pointer",
        _hover: {
          bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
        },
      }}
    >
      <HStack w="full" justifyContent="space-between">
        <HStack spacing={6}>
          <Center
            display="flex"
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
          <HStack>
            <Text>{access.app.length ? access.app[0].appName : "Unknown"}</Text>
            {/* <Text fontSize={12} fontWeight={600} opacity={0.6} mt={2}>
            {t("at-time")} {new Date(access.createdAt).toString()}
          </Text> */}
          </HStack>
        </HStack>
        <Box opacity={0.4}>
          <IoIosArrowForward />
        </Box>
      </HStack>
    </CardContent>
  );
};

export const AccessesCard: FC<AccessesCardProps> = ({ accesses }) => {
  const { t } = useClientTranslation(dictAccessesCard);
  return (
    <Card
      props={{
        w: "full",
        p: 0,
        overflow: "hidden",
      }}
    >
      <CardContent
        props={
          {
            // bg: useColorModeValue("blackAlpha.50", "whiteAlpha.50"),
          }
        }
      >
        <HStack
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={4}
          spacing={[0, 2]}
        >
          <Box>
            <Text
              fontWeight={600}
              textTransform="uppercase"
              opacity={0.6}
              fontSize={12}
            >
              {t("header")}
            </Text>
            <Heading fontWeight={500} size="md" mt={1}>
              {t("header-desc")}
            </Heading>
          </Box>
          <Button
            size="sm"
            rounded="full"
            color="kraikub.green.500"
            fontWeight={600}
            textTransform="uppercase"
          >
            {t("learn")}
          </Button>
        </HStack>
      </CardContent>
      <CustomDivider sx={{ my: 0 }} />
      {!accesses.length ? (
        <CardContent>
          <Text opacity={0.7}>{t("no-access")}</Text>
        </CardContent>
      ) : (
        <VStack spacing={5}>
          {accesses.map((access, index) => {
            return (
              <Box w="full" key={`access-${index}`}>
                <Each access={access} />
                {index === accesses.length - 1 ? null : (
                  <CustomDivider sx={{ my: 0, ms: "60px" }} />
                )}
              </Box>
            );
          })}
        </VStack>
      )}
    </Card>
  );
};
