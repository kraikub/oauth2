import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "./Card";

interface NotificationProps {
  children?: any;
  title?: string;
  detail?: string;
}

export const NotificationToast: FC<NotificationProps> = ({
  children,
  title,
  detail,
}) => {
  return (
    <Card
      props={{
        width: "96vw",
        maxWidth: "500px",
        boxShadow: useColorModeValue("0 0 30px #00000050", "0 0 30px #ffffff10"),
        rounded: 20,
        backdropFilter: "blur(20px)",
        bg: useColorModeValue(
          "notificationCard.light",
          "notificationCard.dark"
        ),
      }}
    >
      <HStack spacing={3}>
        <Box>
          <Center
            w="50px"
            h="50px"
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            fontSize={24}
            rounded={16}
          >
            <BellIcon />
          </Center>
        </Box>
        <Box>
          {title ? <Heading size="sm">{title}</Heading> : null}
          {detail ? (
            <Text opacity={0.7} fontWeight={500}>
              {detail}
            </Text>
          ) : null}
          {children}
        </Box>
      </HStack>
    </Card>
  );
};
