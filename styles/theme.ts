import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const colors = {
  katrade: {
    main: "#0E552F",
    scheme: {
      fix: {
        100: "#0E552F",
        200: "#0E552F",
        300: "#0E552F",
        400: "#0E552F",
        500: "#0E552F",
        600: "#0E552F",
        700: "#0E552F",
        800: "#0E552F",
        900: "#0E552F",
      },
      dynamic: {
        100: "#0E552F",
        200: "#0E552F",
        300: "#0E552F",
        400: "#0E552F",
        500: "#0E552F",
        600: "#0E552F",
        700: "#0E552F",
        800: "#0E552F",
        900: "#0E552F",
      },
    },
    100: "#c7ffd6",
    200: "#7dffa0",
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
  config,
  colors,
  fonts,
};

const theme = extendTheme(overrides);
export default theme;
