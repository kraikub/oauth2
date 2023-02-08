import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Input,
  StackProps,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { Card } from "../../../components/Card";
import { CustomDivider } from "../../../components/CustomDivider";
import { useClientTranslation } from "../../../hooks/client-translation";
import { orgService } from "../../../services/organizationService";
import { orgCreateDict } from "../../../translate/org";

const InputStack: FC<StackProps> = (props) => {
  return (
    <VStack spacing={2} alignItems="start" {...props}>
      {props.children}
    </VStack>
  );
};

export const CreateOrg: FC = () => {
  const { t } = useClientTranslation(orgCreateDict);
  const [orgName, setOrgName] = useState("");
  const [orgUsername, setOrgUsername] = useState("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [userNameErrString, setUsernameErrString] = useState<string>("");
  const [nameErrString, setNameErrString] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOrgUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("@") || e.target.value.includes(" ")) {
      return;
    }
    setOrgUsername(e.target.value.toLocaleLowerCase());
  };

  const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Check orgName
      const { data: nameData } = await orgService.checkName(orgName);
      setNameError(!nameData.payload.available);
      setNameErrString(nameData.message);
      // Check orgUsername
      const { data: usernameData } = await orgService.checkUsername(
        orgUsername
      );
      setUsernameError(!usernameData.payload.available);
      setUsernameErrString(usernameData.message);
      if (!nameData.payload.available || !usernameData.payload.available)
        return;
      // Create
      await orgService.create(orgName, orgUsername, position);
      return router.reload();
    } catch (error) {
      setIsLoading(false);
      alert("Fail to create an organization");
    }
  };

  return (
    <Card>
      <Box mt="18px" mb="30px">
        <Heading size="md">{t("create-title")}</Heading>
      </Box>
      <form onSubmit={handleFormSubmit}>
        <VStack alignItems="start" spacing={6}>
          <InputStack w="full">
            <Text fontWeight={600}>{t("org-name")}</Text>
            <Input
              size="sm"
              rounded={8}
              value={orgName}
              onChange={handleNameChange}
              isInvalid={nameError}
              w="full"
              maxW="400px"
            />
            <Text fontWeight={500} color="red.500">
              {nameErrString}
            </Text>
          </InputStack>

          <InputStack w="full">
            <Text fontWeight={600}>{t("org-username")}</Text>
            <HStack spacing={[0, 2]} flexWrap="wrap" w="full" rowGap={2}>
              <Input
                size="sm"
                rounded={8}
                value={orgUsername}
                onChange={handleOrgUsernameChange}
                isInvalid={usernameError}
                maxW="400px"
              />
              <Box
                p={2}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                rounded={10}
                w={["full", "auto"]}
              >
                <Text fontWeight={600}>
                  {t("display-as")} @{orgUsername}
                </Text>
              </Box>
            </HStack>
            <Text fontWeight={500} color="red.500">
              {userNameErrString}
            </Text>
          </InputStack>
          <InputStack w="full">
            <Box>
              <Text fontWeight={600}>{t("position")}</Text>
              <Text fontSize={12} opacity={0.6}>
                {t("position-description")}
              </Text>
            </Box>
            <Input
              size="sm"
              rounded={8}
              placeholder="Ex. Director of Technology"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              w="full"
              maxW="400px"
            />
            <Text display={position ? "inline" : "none"}>
              {t("show-profile-as")}{" "}
              <strong>
                {position} {t("at")} {orgName}
              </strong>
            </Text>
          </InputStack>
        </VStack>
        <ButtonGroup mt={6}>
          <Button
            colorScheme="kraikub.green.always"
            color="white"
            disabled={!orgName || !orgUsername || !position}
            type="submit"
            isLoading={isLoading}
          >
            {t("btn-create")}
          </Button>
        </ButtonGroup>
      </form>
      <CustomDivider />
      <Box mt={4}>
        <Heading size="sm">{t("join-title")}</Heading>
        <Text mt={2} opacity={0.6}>
          {t("join-description")}
        </Text>
      </Box>
    </Card>
  );
};
