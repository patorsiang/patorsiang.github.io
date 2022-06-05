import { ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Mali",
  },
  palette: {
    mode: "light",
    primary: {
      light: "#49638f",
      main: "#1C3D73",
      dark: "#132a50",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f3f6f7",
      main: "#F1F4F6",
      dark: "#a8aaac",
      contrastText: "#000",
    },
    background: {
      default: "#F1F4F6",
    },
  },
};

export default lightThemeOptions;
