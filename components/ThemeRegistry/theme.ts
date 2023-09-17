import { createTheme } from "@mui/material/styles";
import { blue, blueGrey, grey, indigo } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          light: blue[300],
          main: blue[500],
          dark: blue[700],
          darker: blue[900],
          divider: blue[100],
          text: {
            light: blue["A200"],
            primary: indigo[900],
            secondary: indigo[800],
          },
        }
      : {
          light: blueGrey[300],
          main: blueGrey[500],
          dark: blueGrey[700],
          darker: blueGrey["A700"],
          divider: blueGrey[100],
          background: {
            default: blueGrey[900],
            paper: blueGrey[900],
          },
          text: {
            light: "ghostwhite",
            primary: grey[50],
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: "inherit",
  },
});

export const theme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));
