import "../styles/globals.css";
import "animate.css/animate.min.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "../src/contexts/Language";
import { Loader } from "../src/components/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Loader>
          <Component {...pageProps} />
        </Loader>
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
