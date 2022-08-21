import { styled } from "@mui/material/styles";
import { isMobile } from "react-device-detect";

export const Foot = styled("footer", {
  shouldForwardProp: (prop) => prop !== "top",
})<{ top?: boolean }>(({ theme, top }) => ({
  width: "100%",
  position: top ? "fixed" : "relative",
  bottom: 0,

  [theme.breakpoints.up("sm")]: {
    bottom: 0,
    position: "fixed",
  },
}));
