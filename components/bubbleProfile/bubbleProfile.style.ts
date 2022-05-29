import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const Div = styled("div")(({ theme }) => ({
  position: "relative",
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

export const Introduction = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: theme.typography.h5.fontSize,
  },
  "@media (max-width:320px)": {
    fontSize: theme.typography.h6.fontSize,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: theme.typography.h3.fontSize,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.h3.fontSize,
  },
}));
