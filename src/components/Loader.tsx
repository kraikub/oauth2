import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";

interface LoaderProps {
  children: ReactNode | ReactNode[] | string;
}

export const Loader: FC<LoaderProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const bg = useColorModeValue("whiteAlpha.700", "blackAlhpa.600");
  const handleStart = (url: string) => {
    return url !== router.asPath && setLoading(true);
  };
  const handleComplete = (url: string) => {
    return url === router.asPath && setLoading(false);
  };
  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  if (loading) {
    return (
      <>
        <Box position="fixed" top={0}left={0} right={0} zIndex={999}>
          <Progress size="xs" isIndeterminate colorScheme="kraikub.blue.always" />
        </Box>
        <Modal
          isOpen={loading}
          onClose={() => {}}
          blockScrollOnMount
          closeOnOverlayClick
        >
          <ModalOverlay bg={bg} zIndex={800} />
        </Modal>
        {children}
      </>
    );
  }
  return <>{children}</>;
};
