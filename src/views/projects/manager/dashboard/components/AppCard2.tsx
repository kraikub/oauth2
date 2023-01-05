import {
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { p } from "../../../../../utils/path";

interface AppCardProps {
  app: Application;
}

const AppCard2: FC<AppCardProps> = ({ app }) => {
  const router = useRouter();

  const bgWhenActive = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  return (
    <Link href={`${p.projects}/${app.clientId}`}>
      <a>
        <Box
          w="full"
          overflow="hidden"
          cursor="pointer"
          boxSizing="border-box"
          transition="200ms ease"
          _hover={{
            bgColor: bgWhenActive,
          }}
        >
          <Flex
            ps={8}
            py={4}
            pe={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>{app.appName}</Text>
            <IoIosArrowForward size="20px" />
          </Flex>
        </Box>
      </a>
    </Link>
  );
};
export default AppCard2;
