//.storybook/preview.js

import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider } from "emotion-theming";

import "@fontsource/mali/300.css";
import "@fontsource/mali/400.css";
import "@fontsource/mali/500.css";
import "@fontsource/mali/700.css";

import "@styles/globals.css";

import lightThemeOptions from "@styles/theme/lightThemeOptions";

const theme = createTheme(lightThemeOptions);

export const decorators = [
  (Story) => (
    <MUIThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
    </MUIThemeProvider>
  ),
];
