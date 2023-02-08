import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuButtonProps,
  Button,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { builtInRoles } from "../../../api/config/org";
import { useClientTranslation } from "../../hooks/client-translation";
import { useOnClient } from "../../hooks/on-client";
import { roleSelectorDict } from "../../translate/org";

interface RoleSelectorProps {
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  menuButtonProps?: MenuButtonProps;
  showRolesUnder?: number;
}

export const RoleSelector: FC<RoleSelectorProps> = ({
  role,
  setRole,
  disabled,
  menuButtonProps,
  showRolesUnder
}) => {
  const { t } = useClientTranslation(roleSelectorDict)
  const ready = useOnClient(); 
  if (!ready) {
    return null;
  }
  return (
    <Menu>
      <MenuButton
        px={4}
        h="36px"
        type="button"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        {...menuButtonProps}
      >
        {builtInRoles[role] ? t(builtInRoles[role].roleName) : t("Select role")}{" "}
        {disabled ? null : <ChevronDownIcon />}
      </MenuButton>
      {disabled ? null : (
        <MenuList maxW="100vw">
          {Object.keys(builtInRoles).map((k, index) => {
            const role = builtInRoles[k];
            if (showRolesUnder !== undefined && role.priority <= showRolesUnder) {
              return null;
            }
            return (
              <MenuItem
                key={`option-role-${index}`}
                display="flex"
                flexDirection="column"
                alignItems="start"
                onClick={() => setRole(k)}
              >
                <Text fontWeight={600}>{t(role.roleName)}</Text>
                <Text opacity={0.6} fontSize={12}>
                  {t(`${role.roleType}-desc`)}
                </Text>
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </Menu>
  );
};
