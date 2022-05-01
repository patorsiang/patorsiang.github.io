//.storybook/preview.js
import "../styles/globals.css";

import "@fontsource/mali/300.css";
import "@fontsource/mali/400.css";
import "@fontsource/mali/500.css";
import "@fontsource/mali/700.css";

import { muiTheme } from "storybook-addon-material-ui";

import lightThemeOptions from "../styles/theme/lightThemeOptions";

const lightTheme = muiTheme(lightThemeOptions);

export const decorators = [lightTheme];

// addDecorator((storyFn) => (
//   <ThemeProvider theme={lightTheme}>{storyFn()}</ThemeProvider>
// ));
