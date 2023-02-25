import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { CustomDivider } from "../../../components/CustomDivider";
import { deviceMap, whichIcon } from "./DevicesCard";

interface LogCardProps {
  log: LogDTO;
  isThis?: boolean;
}

export const LogCard: FC<LogCardProps> = ({ log, isThis }) => {
  const [more, setMore] = useState(false);

  const onClose = () => {
    setMore(false);
  };

  const deviceName = deviceMap(log.userAgent, log.userAgentPlatform).replaceAll(
    `"`,
    ""
  );
  const time = new Date(log.timestamp);

  const descriptionStyles = {
    fontSize: 12,
    fontWeight: 400,
    opacity: 0.6,
  };
  const activeGreen = useColorModeValue(
    "kraikub.green.500",
    "kraikub.green.100"
  );
  return (
    <HStack justifyContent="space-between" w="full">
      <HStack>
        <Center w="40px" h="40px" rounded="full" fontSize={20}>
          {whichIcon(deviceName)}
        </Center>
        <Box>
          <Text>{log.app.appName}</Text>
          {isThis ? (
            <Text {...descriptionStyles} opacity={1}>
              <Box as="span" color={activeGreen}>
                Active now
              </Box>{" "}
              • This {deviceName}
            </Text>
          ) : (
            <Text {...descriptionStyles}>
              {time.toDateString()} • {deviceName}
            </Text>
          )}
        </Box>
      </HStack>
      <ButtonGroup>
        <IconButton
          aria-label="more"
          variant="ghost"
          rounded="full"
          size="sm"
          onClick={() => setMore(!more)}
        >
          <FiMoreHorizontal size="18px" />
        </IconButton>
      </ButtonGroup>
      <Modal isOpen={more} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Session Info</Text>
            <CustomDivider sx={{ mb: 0 }} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start" spacing={4}>
              <Box>
                <Text>Logged in on</Text>
                <Text {...descriptionStyles}>
                  {time.toDateString()}, {time.toTimeString()}
                </Text>
              </Box>
              <Box>
                <Text>App</Text>
                <Text {...descriptionStyles}>{log.app.appName}</Text>
              </Box>
              <Box>
                <Text>Scope</Text>
                <Text {...descriptionStyles}>{log.scope}</Text>
              </Box>
              <Box>
                <Text>IP Address</Text>
                <Text {...descriptionStyles}>{log.ip}</Text>
              </Box>
              <Box>
                <Text>User Agent</Text>
                <Text {...descriptionStyles}>{log.userAgent}</Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};
