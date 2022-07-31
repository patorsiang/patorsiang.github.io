import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const Section = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(6),
  backgroundColor: theme.palette.primary.contrastText,
  transform: "skewY(-11deg)",
  marginBottom: theme.spacing(40),
  border: `${theme.spacing(1)} solid ${theme.palette.primary.dark}`,

  "@keyframes bottomLeft": {
    "0%": {
      width: theme.spacing(0),
      height: theme.spacing(0),
    },

    "100%": {
      width: theme.spacing(50),
      height: theme.spacing(30),
    },
  },

  "@keyframes topRight": {
    "0%": {
      width: theme.spacing(0),
      height: theme.spacing(0),
    },

    "100%": {
      width: theme.spacing(30),
      height: theme.spacing(50),
    },
  },
}));

export const ContentSection = styled("div")(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "50em",
  padding: `${theme.spacing(12)} ${theme.spacing(6)}`,
  transform: "skewY(11deg)",
  border: `${theme.spacing(0.25)} solid ${theme.palette.secondary.dark}`,
}));

export const Header = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  width: "fit-content",

  "@keyframes bottom": {
    "0%": {
      width: theme.spacing(0),
    },

    "100%": {
      width: `calc(100% + ${theme.spacing(5)})`,
    },
  },
  "&:after": {
    content: "''",
    display: "block",
    marginLeft: theme.spacing(5),
    width: `calc(100% + ${theme.spacing(5)})`,
    height: "100%",
    borderBottom: theme.spacing(0.5) + " solid " + theme.palette.primary.main,
    marginBottom: theme.spacing(4),
    animation: "bottom 30s",
  },
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

export const Content = styled(Typography)(({ theme }) => ({
  textIndent: theme.spacing(6),
  lineHeight: theme.spacing(5),
  textAlign: "justify",
}));
