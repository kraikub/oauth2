import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserProvider, useUser } from "../../../../contexts/User";
import { useClientTranslation } from "../../../../hooks/client-translation";
import { useOnClient } from "../../../../hooks/on-client";
import Navbar from "../../../../layouts/Navbar";
import { appService } from "../../../../services/appService";
import { p } from "../../../../utils/path";
import { createAppPageDict } from "../../../../translate/create-app";

const typeOptions = [
  { name: "Web Application", value: "web-application" },
  { name: "Data Analytics / ML", value: "web-application" },
  { name: "Mobile apps", value: "web-application" },
  { name: "Decentralized Apps & Web 3.0 (Blockchain)", value: "dapps" },
  { name: "DevOps", value: "web-application" },
  { name: "Data Engineering", value: "web-application" },
  { name: "Business Development", value: "web-application" },
];

interface CreateProjectPageProps {
  data: UserWithStudent | null;
}

export const CreateProjectPage: NextPage<CreateProjectPageProps> = ({
  data,
}) => {
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm();
  const [hasName, setHasName] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useClientTranslation(createAppPageDict);
  const ready = useOnClient();

  const inputStyles = {
    variant: "outline",
    size: "md",
    rounded: 8,
    transition: "100ms ease",
  };

  if (!ready) {
    return null;
  }

  return (
    <UserProvider user={data}>
      <Navbar />
      <Container maxW="container.md" py="100px">
        <Heading letterSpacing={-1} size="lg">
          {t("header")}
        </Heading>
        <FormControl
          as="form"
          my={10}
          isRequired
          maxW="700px"
          onSubmit={handleSubmit(async (data) => {
            const hasNameResponse = await appService.hasName(data.appName);
            if (hasNameResponse?.payload !== false) {
              setHasName(true);
              setLoading(false);
              return;
            }
            try {
              const res = await appService.createApplication(data);
              setLoading(false);
              router.push(`${p.projects}/${res?.payload.clientId}`);
            } catch (err) {
              setLoading(false);
            }
          })}
        >
          <FormLabel
            htmlFor="app-name"
            mt={6}
            color={hasName ? "red.500" : "inherit"}
          >
            {t("app-name")} {hasName ? `(${t("error-invalid-name")})` : null}
          </FormLabel>
          <Input
            id="app-name"
            {...register("appName")}
            isInvalid={hasName}
            {...inputStyles}
            placeholder="Keep it easy, such as OceanicUltraOctopus!"
          />

          <FormLabel htmlFor="app-details" mt={6}>
            {t("describe")}
          </FormLabel>
          <Textarea
            {...register("appDescription")}
            {...inputStyles}
            placeholder="A really cool app."
          />

          <FormLabel htmlFor="app-creator" mt={6}>
            {t("creator-name")}
          </FormLabel>
          <Input
            id="app-creator"
            placeholder="Alice"
            {...register("creatorName")}
            {...inputStyles}
          />

          <FormLabel htmlFor="app-type" mt={6}>
            {t("categories")}
          </FormLabel>
          <Select
            id="app-type"
            placeholder="Select type"
            {...register("appType")}
            {...inputStyles}
          >
            {typeOptions.map((opt, index) => (
              <option key={`${opt.name}-${index}`} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </Select>
          <ButtonGroup mt={10}>
            <Button size="md" onClick={() => router.push(p.projects)}>
              {t("btn-cancel")}
            </Button>
            <Button
              type="submit"
              colorScheme="kraikub.blue"
              isLoading={loading}
              size="md"
            >
              {t("btn-submit")}
            </Button>
          </ButtonGroup>
        </FormControl>
      </Container>
    </UserProvider>
  );
};
