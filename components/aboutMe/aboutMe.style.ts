import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const Section = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(24),
  backgroundColor: theme.palette.primary.contrastText,
  transform: "skewY(-11deg)",
}));

export const Content = styled("div")(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "50em",
  padding: `${theme.spacing(12)} ${theme.spacing(6)}`,
  transform: "skewY(11deg)",
}));

export const Header = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
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