import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useUser } from "../contexts/User";

const Navbar: FC = () => {
  const router = useRouter()
  const { user, signout } = useUser();
  return (
    <Flex
      position="sticky"
      top={0}
      left={0}
      right={0}
      py="12px"
      bg="white"
      zIndex={35}
      boxShadow="0 10px 10px #00000010"
      px="20px"
      minH="60px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading size="md" fontWeight={700} color="black">
        kraikub{" "}
      </Heading>
      {user ? (
        <Menu>
          <MenuButton>
            <ButtonGroup>
              <IconButton
                aria-label="profile-icon"
                bg="transparent"
                _hover={{ bg: undefined }}
                _active={{ bg: undefined }}
              >
                <Avatar
                  name={`${user?.firstNameEn} ${user?.lastNameEn}`}
                  size="sm"
                />
              </IconButton>
            </ButtonGroup>
          </MenuButton>
          <MenuList fontSize={14}>
            <Box px={4} py={3} fontSize={12} fontWeight={500}>
              <Text>Signed in as </Text>

              <Text fontWeight={600}>{user.firstNameEn} {user.lastNameEn[0]}.</Text>
            </Box>
            <Divider mb={4}/>
            <MenuItem fontWeight={500} onClick={() => router.push("/projects/manager")}>Your Apps</MenuItem>
            <MenuItem color="red.600" _hover={{bg: "red.50"}} fontWeight={500} onClick={signout}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      ) : null}
    </Flex>
  );
};
export default Navbar;
