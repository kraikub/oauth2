import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CardContent } from "../../../components/Card";
import { useClientTranslation } from "../../../hooks/client-translation";
import { orgService } from "../../../services/organizationService";
import { orgDeleteDict } from "../../../translate/org";

interface DeleteOrgProps {
  org: Organization;
}

export const DeleteOrg: FC<DeleteOrgProps> = ({ org }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useClientTranslation(orgDeleteDict);

  const handleDeleteOrg = async () => {
    try {
      setLoading(true);
      await orgService.deleteOrg(org.orgId);
      setLoading(false);
      router.reload();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <CardContent>
        <HStack justifyContent="space-between">
          <Box>
            <Text
              fontWeight={600}
              fontSize={12}
              textTransform="uppercase"
              opacity={0.6}
            >
              {t("top-title")}
            </Text>
            <Text mt={1}>
              {t("delete")} {org.orgName}
            </Text>
          </Box>
          <ButtonGroup>
            <IconButton
              aria-label="delete-btn"
              rounded="full"
              bg={useColorModeValue("gray.100", "whiteAlpha.200")}
              fontSize={22}
              onClick={() => setOpen(true)}
              isLoading={loading}
            >
              <MdDelete />
            </IconButton>
          </ButtonGroup>
        </HStack>
      </CardContent>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text
              fontWeight={600}
              fontSize={12}
              textTransform="uppercase"
              opacity={0.6}
            >
              {t("top-title")}
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text>
              {t("delete")} {org.orgName}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
              <Button
                colorScheme="kraikub.red.always"
                color="white"
                onClick={handleDeleteOrg}
                isLoading={loading}
              >
                {t("delete")}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
