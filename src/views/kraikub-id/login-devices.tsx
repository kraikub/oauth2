import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { FC, useRef } from "react";
import { ClientRender } from "../../components/ClientRender";
import { CustomDivider } from "../../components/CustomDivider";
import { useClientTranslation } from "../../hooks/client-translation";
import { dictDeviceCard } from "../../translate/kraikubid";
import { LogCard } from "./components/LogCard";

interface UserLogsProps {
  logs: LogDTO[];
  ssid: string;
}

export const UserLogsPage: FC<UserLogsProps> = ({ logs, ssid }) => {
  const {} = useClientTranslation(dictDeviceCard);
  return (
    <ClientRender>
      <Container maxW="container.md">
        <Text fontWeight={600}>Account activities</Text>
        <CustomDivider  />
        <VStack alignItems="start" spacing={3} mt={5}>
          {[...logs].reverse().map((log, index) => {
            console.log(log.timestamp);
            return (
              <LogCard
                log={log}
                key={`log-${index}`}
                isThis={log.ssid === ssid}
              />
            );
          })}
        </VStack>
      </Container>
    </ClientRender>
  );
};
