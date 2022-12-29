import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { useLanguage } from "../contexts/Language";
import { useOnClient } from "../hooks/on-client";

interface SmartLanguageTogglerProps {
  sx?: ButtonProps;
}

export const SmartLanguageToggler: FC<SmartLanguageTogglerProps> = (props) => {
  const [c, setCookie] = useCookies(["LANG"]);
  const ready = useOnClient();
  const setLang = (l: string) => {
    setCookie("LANG", l, { path: "/" });
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
        return "View in English";
      }
      case "en": {
        return "ภาษาไทย";
      }
      default: {
        return "ภาษาไทย";
      }
    }
  };

  const borderColor = useColorModeValue("gray.400", "gray.600")

  if (!ready) {
    return null
  }

  return (
    <Button
      variant="outline"
      rounded="full"
      onClick={() => setLang(toggleLangValue())}
      borderColor={borderColor}
      {...props.sx}
    >
      {textSelector()}
    </Button>
  );
};
