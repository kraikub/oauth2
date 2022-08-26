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
  body: `'Manrope', 'Noto Sans Thai', sans-serif`,
  heading: `'Manrope', 'Noto Sans Thai', sans-serif`,
};

const components = {
  Text: {
    baseStyle: {
      fontSize: 14,
      fontWeight: 500,
    }
  },
  Input: {
    defaultProps: {
      fontSize: 20,
      fontWeight: 600,
    }
  }
}

const overrides = {
  config,
  colors,
  fonts,
  components,
};

const theme = extendTheme(overrides);
export default theme;
