import { extendTheme } from "@chakra-ui/react";

const colors = {
  katrade: {
    300: "#2eff66",
    400: "#00db3a",
    500: "#00b530",
    600: "#009127",
  },
};

const fonts = {
  body: `'Noto Sans Thai', 'Inter', sans-serif`,
  heading: `'Noto Sans Thai', 'Inter', sans-serif`,
};

const overrides = {
  colors,
  fonts,
};

const theme = extendTheme(overrides);
export default theme;
