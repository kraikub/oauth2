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
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserProvider, useUser } from "../../../../contexts/User";
import Navbar from "../../../../layouts/Navbar";
import { appService } from "../../../../services/appService";

const typeOptions = [
  { name: "Web Application", value: "web-application" },
  { name: "Data Analytics / ML", value: "web-application" },
  { name: "Mobile apps", value: "web-application" },
  { name: "DevOps", value: "web-application" },
  { name: "Data Engineering", value: "web-application" },
  { name: "Business Development", value: "web-application" },
];

export const CreateProjectPage: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm();
  const { reload } = useUser()
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <UserProvider>
      <Navbar />
      <Container maxW="container.md" py="100px">
        <Heading fontWeight={600} letterSpacing={-1}>Tell us about your new app.</Heading>
        <FormControl
          as="form"
          my={10}
          isRequired
          maxW="700px"
          onSubmit={handleSubmit(async (data) => {
            
            const ac = localStorage.getItem("access")
            setLoading(true)
            if (!ac) {
              alert("no access token!")
              setLoading(false)
              return reload();
            }
            const res = await appService.createApplication(data, ac)
            setLoading(false)
            router.push(`/projects/manager/${res?.payload.clientId}`)
          })}
        >
          <FormLabel htmlFor="app-name" mt={6}>
            Application name
          </FormLabel>
          <Input id="app-name" {...register("appName")} size="sm" />

          <FormLabel htmlFor="app-details" mt={6}>
            Tell us more about your application
          </FormLabel>
          <Textarea {...register("appDescription")} />

          <FormLabel htmlFor="app-creator" mt={6}>
            Creator name
          </FormLabel>
          <Input id="app-creator" size="sm" {...register("creatorName")} />

          <FormLabel htmlFor="app-url" mt={6}>
            Callback URL
          </FormLabel>
          <Input
            id="app-url"
            size="sm"
            placeholder="Ex. https://example.com/callback"
            {...register("callbackUrl")}
          />

          <FormLabel htmlFor="app-local-url" mt={6}>
            Development callback URL
          </FormLabel>
          <Input
            id="app-local-url"
            size="sm"
            placeholder="Ex. http://localhost:3000/callback or http://127.0.0.1:8080/callback"
            {...register("devCallbackUrl")}
          />

          <FormLabel htmlFor="app-type" mt={6}>
            Application field
          </FormLabel>
          <Select
            id="app-type"
            placeholder="Select type"
            {...register("appType")}
          >
            {typeOptions.map((opt, index) => (
              <option key={`${opt.name}-${index}`} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </Select>
          <ButtonGroup mt={10}>
            <Button type="submit" colorScheme="gray">
              Cancel
            </Button>
            <Button type="submit" colorScheme="katrade.scheme.fix" isLoading={loading}>
              Create
            </Button>
          </ButtonGroup>
        </FormControl>
      </Container>
    </UserProvider>
  );
};
