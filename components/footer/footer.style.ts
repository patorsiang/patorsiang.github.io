import { styled } from "@mui/material/styles";
import { isMobile } from "react-device-detect";

export const Foot = styled("footer")(() => ({
  bottom: 0,
  width: "100%",
  position: isMobile ? "relative" : "fixed",
}));
