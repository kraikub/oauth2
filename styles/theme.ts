import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export const colors = {
  katrade: {
    100: "#c7ffd6",
    200: "#7dffa0",
    300: "#2eff66",
    400: "#00D861",
    500: "#00D861",
    600: "#009127",
  },
  kraikub: {
    blue: {
      200: "#7B65FF",
      300: "#644AFC",
      400: "#5238EC",
      500: "#2D19A6",
    },
  },
  bg: {
    light: "#ffffff",
    dark: "#000000",
  },
  color: {
    light: "#262626",
    dark: "#e6e9ea",
  },
};

const fonts = {
  body: `-apple-system, BlinkMacSystemFont, "Segoe UI", "", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", "", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
};

const components: { [key: string]: ComponentStyleConfig } = {
  Text: {
    baseStyle: {
      fontSize: 16,
      fontWeight: 500,
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 700,
    },
    sizes: {
      xl: {
        fontSize: "3rem",
        letterSpacing: "-0.05em",
      },
      lg: {
        letterSpacing: "-0.03em",
      },
      md: {
        letterSpacing: "-0.015em",
      },
    },
  },
  Input: {
    defaultProps: {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  Button: {
    baseStyle: {
      rounded: 8,
      fontWeight: 600,
    },
    sizes: {
      sm: {
        height: "30px",
        fontSize: 12,
      },
      md: {
        fontSize: 14,
      },
      lg: {
        fontSize: 16,
      },
    },
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode(colors.bg.light, colors.bg.dark)(props),
      color: mode(colors.color.light, colors.color.dark)(props),
    },
  }),
};

const overrides = {
  config,
  colors,
  fonts,
  components,
  styles,
};

const theme = extendTheme(overrides);
export default theme;
