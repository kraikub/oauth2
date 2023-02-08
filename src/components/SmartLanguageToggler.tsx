import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { useLanguage } from "../contexts/Language";
import { useOnClient } from "../hooks/on-client";

interface SmartLanguageTogglerProps {
  sx?: ButtonProps;
  reloadOnToggle?: boolean;
}

export const SmartLanguageToggler: FC<SmartLanguageTogglerProps> = (props) => {
  const [c, setCookie] = useCookies(["LANG"]);
  const router = useRouter();
  const ready = useOnClient();
  const setLang = (l: string) => {
    setCookie("LANG", l, { path: "/" });
    if (props.reloadOnToggle) {
      router.reload();
    }
  };

  const toggleLangValue = () => {
    switch (c.LANG) {
      case "th": {
        return "en";
      }
      case "en": {
        return "th";
      }
      default: {
        return "th";
      }
    }
  };

  const textSelector = () => {
    switch (c.LANG) {
      case "th": {
        return "English";
      }
      case "en": {
        return "ภาษาไทย";
      }
      default: {
        return "ภาษาไทย";
      }
    }
  };

  const styles = {
    rounded: "full",
    textTransform: "uppercase" as "uppercase",
    color: useColorModeValue("kraikub.green.600", "kraikub.green.300"),
    bg: useColorModeValue("blackAlpha.100", "whiteAlpha.200"),
    fontWeight: 700,
    _hover: {
      bg: useColorModeValue("blackAlpha.300", "whiteAlpha.300"),
    },
  };
  const onHoverStyles: ButtonProps = {};
  if (!ready) {
    return null;
  }

  return (
    <Button
      {...styles}
      onClick={() => setLang(toggleLangValue())}
      _hover={onHoverStyles}
      {...props.sx}
    >
      {textSelector()}
    </Button>
  );
};
