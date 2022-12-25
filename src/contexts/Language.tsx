import { Progress } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useOnClient } from "../hooks/on-client";
import { userService } from "../services/userService";
import { getSigninUrl } from "../utils/path";

interface LanguageProviderProps {
  children?: any;
  lang: string;
}

interface LanguageContext {
  language: string
}

const deafaultLanguageContextValue = {
  language: "th"
};

export const languageContext = createContext<LanguageContext>(deafaultLanguageContextValue);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children, lang }) => {
  const [c, sc] = useCookies(["LANG"])
  const client = useOnClient()

  useEffect(() => {
    if (!c.LANG) {
      sc("LANG", deafaultLanguageContextValue.language)
    } else {

    }
  }, [])

  if (!client) return null;

  return (
    <languageContext.Provider
      value={{
        language: c.LANG
      }}
    >
      {children}
    </languageContext.Provider>
  );
};

export const useLanguage = () => useContext(languageContext);
