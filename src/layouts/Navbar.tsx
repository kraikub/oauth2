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
import { MdDashboardCustomize } from "react-icons/md";
import logo from "../../public/logo-min.png";
import { appConfig } from "../../api/config/app";
const Navbar: FC = () => {
  const router = useRouter();
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
      border="solid #00000020"
      borderWidth="0 0 1px 0"
      px="20px"
      minH="60px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" gap={2}>
        <Heading size="sm" fontWeight={600} color="black">
          KRAIKUB <Text as="span" fontWeight={300} color="gray.600">DEVELOPERS</Text>
        </Heading>
      </Flex>
      {user ? (
        <Flex alignItems="center" gap={4}>
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
                    src={user.profileImageUrl || appConfig.defaultProfileImageUrl}
                    name={user.student.nameEn.split(" ").slice(1).join(" ")}
                    size="sm"
                  />
                </IconButton>
              </ButtonGroup>
            </MenuButton>
            <MenuList fontSize={14}>
              <Box px={4} py={3} fontSize={12} fontWeight={500}>
                <Text fontWeight={600}>
                  {user.student.nameTh.split(" ").slice(1).join(" ")}
                </Text>
              </Box>
              <Divider mb={4} />
              <MenuItem
                fontWeight={500}
                onClick={() => router.push("/projects/manager")}
              >
                แอป
              </MenuItem>
              <MenuItem
                color="red.600"
                _hover={{ bg: "red.50" }}
                fontWeight={500}
                onClick={signout}
              >
                ออกจากระบบ
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : null}
    </Flex>
  );
};
export default Navbar;
