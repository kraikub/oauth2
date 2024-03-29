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
      100: "#e0edff",
      200: "#abceff",
      300: "#70acff",
      400: "#3d8eff",
      500: "#1468de",
      600: "#0952b8",
      700: "#033c8c",
      800: "#00275e",
      900: "#001430",
      always: {
        200: "#1468de",
        300: "#1468de",
        400: "#1468de",
        500: "#1468de",
        600: "#1468de",
      },
    },
    green: {
      50: "#1aef74",
      100: "#00ed64",
      200: "#00ed64",
      300: "#00d55a",
      400: "#00be50",
      500: "#00a646",
      600: "#008e3c",
      700: "#007732",
      800: "#005f28",
      900: "#00471e",
      always: {
        200: "#00a646",
        300: "#00a646",
        400: "#00a646",
        500: "#00a646",
        600: "#00a646",
      },
    },
    red: {
      50: "#ffeaec",
      100: "#ffd5d8",
      200: "#ffaab1",
      300: "#ff808b",
      400: "#ff5564",
      500: "#ff2b3d",
      600: "#cc2231",
      700: "#991a25",
      800: "#661118",
      900: "#33090c",
      always: {
        200: "#ff2b3d",
        300: "#ff2b3d",
        400: "#ff2b3d",
        500: "#ff2b3d",
        600: "#ff2b3d",
      },
    },
  },
  bg: {
    light: "#ffffff",
    dark: "#000000",
  },
  card: {
    light: "#ffffff",
    dark: "#1a1c1c",
  },
  color: {
    light: "#262626",
    dark: "#e6e9ea",
  },
  notificationCard: {
    light: "#ffffff",
    dark: "#101010",
  },
  greyscale: {
    main: {
      200: "#ffffff40",
      600: "#00000040",
    },
  },
};

const fonts = {
  // body: `-apple-system, BlinkMacSystemFont, Helvetica, "Sukhumvit", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  // heading: `-apple-system, BlinkMacSystemFont, Helvetica, "Sukhumvit", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  body: `'Inter', sans-serif`,
  heading: `'inter Tight', sans-serif`,
};

const components: { [key: string]: ComponentStyleConfig } = {
  Text: {
    baseStyle: {
      fontSize: 14,
      fontWeight: 500,
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 500,
    },
    sizes: {
      xl: {
        fontSize: "3rem",
        // letterSpacing: "-0.05em",
      },
      lg: {
        // letterSpacing: "-0.03em",
      },
      md: {
        // letterSpacing: "-0.015em",
      },
    },
  },
  Input: {
    defaultProps: {
      fontSize: 20,
      fontWeight: 500,
      focusBorderColor: "kraikub.green.500",
    },
  },
  Button: {
    baseStyle: {
      rounded: 8,
      fontWeight: 500,
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
  Modal: {
    defaultProps: {
      isCentered: true,
      motionPreset: "slideInBottom",
    },
    baseStyle: (props) => ({
      closeButton: {
        rounded: "full",
      },
      dialog: {
        rounded: 14,
        roundedBottomLeft: [0, 0, 14],
        roundedBottomRight: [0, 0, 14],
        alignSelf: ["flex-end", "flex-center"],
        m: [0, 0, "auto"],
        minW: ["100vw", "100vw", "container.sm"],
        maxH: ["92vh", "92vh", "70vh"],
        bg: mode(colors.card.light, colors.card.dark)(props),
      },
    }),
  },
  Menu: {
    baseStyle: (props) => ({
      list: {
        bg: mode(colors.card.light, colors.card.dark)(props),
        boxShadow: "0 10px 20px #00000030",
        rounded: 14,
      },
      item: {
        bg: "transparent",
        _hover: {
          bg: mode("blackAlpha.100", "whiteAlpha.100")(props),
        },
      },
    }),
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
