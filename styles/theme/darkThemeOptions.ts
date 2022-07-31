import { ThemeOptions } from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Mali",
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#F1F4F6",
      main: "#49638f",
      dark: "#f3f6f7",
      contrastText: "#000",
    },
    secondary: {
      light: "#f3f6f7",
      main: "#1C3D73",
      dark: "#5179bd",
      contrastText: "#fff",
    },
    info: {
      light: "#BBD3EA",
      main: "#7db6c7",
    },
    background: {
      default: "#132a50",
    },
  },
};

export default darkThemeOptions;
