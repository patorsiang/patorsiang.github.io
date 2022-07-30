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
      light: "#a8aaac",
      main: "#1C3D73",
      dark: "#132a50",
      contrastText: "#fff",
    },
    info: {
      main: "#BBD3EA",
    },
    background: {
      default: "#132a50",
    },
  },
};

export default darkThemeOptions;
