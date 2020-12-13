import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

import WorkSansTTF from '../assets/fonts/WorkSans-VariableFont_wght.ttf';

const WorkSans = {
  fontFamily: 'Work Sans Thin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Work Sans Thin'),
    local('Work Sans Thin'),
    url(${WorkSansTTF}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const colors = {
  white: "#fff",
  black: '#000',
  almostBlack : '#1e1e1e',
  blue: "#2F80ED",
  lightGray: "rgb(244, 245, 246);",
  darkGray: "rgba(43,57,84,.5)",
  green: '#1abc9c',
  red: '#ed4337',
  orange: 'orange',

  text: "#007bff",
};

const breakpoints = createBreakpoints({
  keys: ["xs", "sm", "md", "lg", "xl"],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800
  }
})

const iswapTheme =  {
  typography: {
    h1: {
      fontSize: '24px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h2: {
      fontSize: '20px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
      color: colors.blue
    },
    h3: {
      fontSize: '16px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
      color: colors.white

    },
    h6: {
      fontSize: '12px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2,
      color: colors.white
    },
  },
  type: 'dark',
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [WorkSans],
      },
    }
  },
  palette: {
    primary: {
      main: colors.blue
    },
    secondary: {
      main: colors.blue
    },
    text: {
      primary: colors.text,
      secondary: colors.text
    }
  },
  breakpoints: breakpoints
};

export default iswapTheme;
