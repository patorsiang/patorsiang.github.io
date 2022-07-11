import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const FullScreen = styled("div")(({ theme }) => ({
  width: "100wv",
  height: "100%",
  padding: theme.spacing(2),
  marginTop: theme.spacing(12),
}));

export const Overall = styled("div")(({ theme }) => ({
  position: "relative",
  width: "fit-content",
  margin: "0 auto",
}));

export const Span = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    paddingLeft: theme.spacing(12),
  },
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(24),
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(32),
  },
}));

export const Introduction = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  [theme.breakpoints.up("xs")]: {
    fontSize: theme.typography.h5.fontSize,
    top: 0,
  },
  "@media (max-width:320px)": {
    fontSize: theme.typography.h6.fontSize,
    top: 0,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: theme.typography.h3.fontSize,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.h3.fontSize,
  },
}));

export const CurrentPosition = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: theme.typography.subtitle1.fontSize,
    top: 0,
  },
  "@media (max-width:320px)": {
    fontSize: theme.typography.subtitle2.fontSize,
    top: 0,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: theme.typography.h5.fontSize,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.h5.fontSize,
  },
}));
