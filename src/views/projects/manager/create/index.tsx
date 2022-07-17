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
import { UserProvider } from "../../../../contexts/User";
import Navbar from "../../../../layouts/Navbar";

const typeOptions = [
  { name: "Web Application", value: "web-application" },
  { name: "Data Analytics / ML", value: "web-application" },
  { name: "Mobile apps", value: "web-application" },
  { name: "DevOps", value: "web-application" },
  { name: "Data Engineering", value: "web-application" },
  { name: "Business Development", value: "web-application" },
];

export const CreateProjectPage: NextPage = () => {
  return (
    <UserProvider>
      <Navbar />
      <Container maxW="container.xl" py="100px">
        <Heading fontWeight={600}>สร้างแอปของคุณ</Heading>
        <FormControl my={10} isRequired maxW="700px">
          <FormLabel htmlFor="app-name" mt={6}>
            Application name
          </FormLabel>
          <Input id="app-name" size="sm" />

          <FormLabel htmlFor="app-details" mt={6}>
            Tell us more about your application
          </FormLabel>
          <Textarea />

          <FormLabel htmlFor="app-creator" mt={6}>
            Creator name
          </FormLabel>
          <Input id="app-creator" size="sm" />

          <FormLabel htmlFor="app-url" mt={6}>
            Callback URL
          </FormLabel>
          <Input id="app-url" size="sm" placeholder="Ex. https://example.com/callback"/>

          <FormLabel htmlFor="app-local-url" mt={6}>
            Development callback URL
          </FormLabel>
          <Input id="app-local-url" size="sm" placeholder="Ex. http://localhost:3000/callback or http://127.0.0.1:8080/callback"/>

          <FormLabel htmlFor="app-type" mt={6}>
            Application field
          </FormLabel>
          <Select id="app-type" placeholder="Select type">
            {typeOptions.map((opt, index) => (
              <option key={`${opt.name}-${index}`} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </Select>
          <ButtonGroup mt={10}>
            <Button type="submit" colorScheme="gray">Cancel</Button>
            <Button type="submit" colorScheme="katrade">Create</Button>
          </ButtonGroup>
        </FormControl>
      </Container>
    </UserProvider>
  );
};
