//.storybook/preview.js

import { muiTheme } from "storybook-addon-material-ui";

import lightThemeOptions from "../styles/theme/lightThemeOptions";

export const decorators = [muiTheme(lightThemeOptions)];
