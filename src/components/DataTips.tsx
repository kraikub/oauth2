import { Center, Tooltip } from "@chakra-ui/react";
import { MdPolicy, MdPrivacyTip } from "react-icons/md";

export const DataTips = () => {
  return (
    <Tooltip
      label="Learn more about our data controls."
      py={3}
      px={4}
      placement="left"
      rounded={8}
    >
      <Center
        position="fixed"
        bottom="18px"
        right="18px"
        w="15vw"
        h="15vw"
        maxW="70px"
        maxH="70px"
        bg="katrade.400"
        rounded="full"
        color="white"
        boxShadow="0 0px 20px #00000030"
        cursor="pointer"
        transition="300ms ease"
        _hover={{
          transform: "scale(1.1)",
        }}
      >
        <MdPrivacyTip size="40%" />
      </Center>
    </Tooltip>
  );
};
