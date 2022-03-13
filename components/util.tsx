import { experimentalStyled as styled } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";

export const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  lineHeight: "54px",
}));

export const GridRight = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingRight: theme.spacing(1),
  },
  [theme.breakpoints.up("md")]: {
    paddingRight: theme.spacing(6),
  },
  justifyContent: "right",
  textAlign: "right",
}));

export const ItemRight = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "right",
  height: "100%",
  lineHeight: "54px",
  width: "100%",
}));
